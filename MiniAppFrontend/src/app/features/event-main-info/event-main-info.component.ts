import { Component, inject, input } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonModal, IonPopover } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { AvatarsListComponent, UsersListComponent } from 'src/app/shared/components';
import { EventMainInfoLocalize } from './event-main-info.localize';
import { Router } from '@angular/router';
import { ConfirmService, TelegramService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { filter, finalize, from, shareReplay, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { EventMainInfoRequestService } from './event-main-info-request.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FeatureLoadDirective, ImgLoadDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-event-main-info',
  templateUrl: './event-main-info.component.html',
  styleUrls: ['./event-main-info.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAccordionGroup,
    IonAccordion,
    IonAvatar,
    IonModal,
    IonPopover,
    AvatarsListComponent,
    UsersListComponent,
    ImgLoadDirective,
  ],
})
export class EventMainInfoComponent {
  public readonly eventId = input.required<string>();
  private readonly eventId$ = toObservable(this.eventId);

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);
  private readonly tg = inject(TelegramService);
  private readonly request = inject(EventMainInfoRequestService);
  private readonly featureLoad = inject(FeatureLoadDirective, { optional: true });

  private refreshInfo$ = new Subject<boolean>();
  private refreshUsers$ = new Subject<boolean>();

  private readonly info$ = this.refreshInfo$.pipe(
    startWith(true),
    switchMap(() => this.eventId$),
    tap(() => this.featureLoad?.incrLoading()),
    switchMap((eventId) =>
      this.request.getEventInfo(eventId)
        .pipe(finalize(() => this.featureLoad?.decrLoading()))
    ),
    shareReplay(1)
  );

  private readonly users$ = this.refreshUsers$.pipe(
    startWith(true),
    switchMap(() => this.eventId$),
    tap(() => this.featureLoad?.incrLoading()),
    switchMap((eventId) =>
      this.request.getEventUsers(eventId)
        .pipe(finalize(() => this.featureLoad?.decrLoading()))
    ),
    shareReplay(1)
  );



  public readonly info = toSignal(this.info$);
  public readonly users = toSignal(this.users$);
  
  private readonly local = inject(LocalizeService);
  public readonly EventMainInfoLocalize = EventMainInfoLocalize;

  constructor() { }

  public refreshInfo(): void {
    this.refreshInfo$.next(true);
  }

  public refreshUsers(): void {
    this.refreshUsers$.next(true);
  }

  public copyToClipboard(): void {
    this.tg.getEventTgLink(this.eventId())
      .pipe(
        switchMap((link) => from(navigator.clipboard.writeText(link))),
        take(1)
      )
      .subscribe(() => {
        const toastMessage = this.local.localizeSync(EventMainInfoLocalize.ClipboardLink);
        this.toast.light(toastMessage, 'clipboard-outline')
      });
  }

  public share(): void {
    if (this.eventId()) {
      this.tg.shareEvent(this.eventId(), this.info()?.name);
    }
  }

  public redirectToEdit(): void {
    const queryParams = { eventId: this.eventId() };
    this.router.navigate(['edit'], { queryParams });
  }

  public deleteEvent(): void {
    const header = this.local.localizeSync(EventMainInfoLocalize.DeleteQuestion);
    const message = this.local.localizeSync(EventMainInfoLocalize.CannotBeUndone);
    const toastMessage = this.local.localizeSync(EventMainInfoLocalize.EventWasDeleted);
    this.confirm.createConfirm({ header, message }).pipe(
      filter(Boolean),
      tap(() => this.featureLoad?.incrLoading()),
      switchMap(() => this.request.deleteEvent(this.eventId())),
      tap(() => this.toast.info(toastMessage, 'trash-outline')),
      finalize(() => this.featureLoad?.decrLoading())
    ).subscribe(() => this.router.navigate(['edit']))
  }

}
