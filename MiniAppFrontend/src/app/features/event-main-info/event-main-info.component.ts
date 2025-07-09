import { Component, inject, input } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonModal, IonPopover } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { AvatarsListComponent, UsersListComponent } from 'src/app/shared/components';
import { EventMainInfoLocalize } from './event-main-info.localize';
import { Router } from '@angular/router';
import { TelegramService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { shareReplay, switchMap, take } from 'rxjs';
import { EventMainInfoRequestService } from './event-main-info-request.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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
  ],
})
export class EventMainInfoComponent {
  public readonly eventId = input.required<string>();

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly tg = inject(TelegramService);
  private readonly request = inject(EventMainInfoRequestService);

  private readonly info$ = toObservable(this.eventId).pipe(
    switchMap((eventId) => this.request.getEventInfo(eventId)),
    shareReplay(1)
  );

  public readonly info = toSignal(this.info$);
  
  private readonly localizeService = inject(LocalizeService);
  public readonly EventMainInfoLocalize = EventMainInfoLocalize;

  constructor() { }

  public copyToClipboard(): void {
    this.localizeService.localize(EventMainInfoLocalize.ClipboardLink)
      .pipe(take(1))
      .subscribe((message) => this.toast.light(message, 'clipboard-outline'));
  }

  public share(): void {
    const url = 'vslitvinenko.github.io/when-to-drink';
    const text = 'whoever reads this will die';
    this.tg.share(url, text);
  }

  public redirectToEdit(): void {
    const queryParams = { eventId: this.eventId() };
    this.router.navigate(['edit'], { queryParams });
  }

}
