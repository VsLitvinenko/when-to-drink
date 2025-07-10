import { Component, computed, inject, input, output, signal } from '@angular/core';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { IonDateSpecifyDirective } from './directives';
import { format } from 'date-fns';
import { VoteDate } from './models';
import { FormsModule } from '@angular/forms';
import { SmallToolsService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { VoteCalendarLocalize } from './vote-calendar.localize';
import { VoteCalendarRequestService } from './vote-calendar-request.service';
import { map, merge, Observable, shareReplay, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';


const timeFormat = "yyyy-MM-dd'T'HH:mm:ss";

@Component({
  selector: 'app-vote-calendar',
  templateUrl: './vote-calendar.component.html',
  styleUrls: ['./vote-calendar.component.scss'],
  imports: [
    SharedFeatureModule,
    IonDateSpecifyDirective,
    IonDatetime,
    IonChip,
    IonPopover,
    IonModal,
    FormsModule,
  ],
})
export class VoteCalendarComponent {
  public readonly eventId = input.required<string>();
  public readonly minDate = input();
  public readonly maxDate = input();
  public readonly voteUpdated = output();
  // update vote dates event
  public readonly resetDates$ = new Subject<boolean>();
  public readonly clearDates$ = new Subject<boolean>();
  public readonly saveDates$ = new Subject<VoteDate[]>();

  private readonly request = inject(VoteCalendarRequestService);
  // get init data
  private readonly loadedVoteDates$ = toObservable(this.eventId).pipe(
    switchMap((eventId) => this.request.getEventVote(eventId)),
    shareReplay(1)
  );
  // update data
  private readonly updatedVoteDates$ = this.saveDates$.pipe(
    switchMap((dates) => this.request.updateEventVote(this.eventId(), dates)),
    tap(() => {
      const local = VoteCalendarLocalize.HasBeenSaved;
      this.localizeService.localize(local, true)
        .subscribe((m) => this.toast.info(m, 'cloud-done-outline'));
    }),
    tap(() => this.voteUpdated.emit()),
    shareReplay(1)
  );

  // main data obs
  public readonly voteDates$: Observable<VoteDate[]> = merge(
    this.resetDates$.pipe(
      startWith(true),
      switchMap(() => merge(this.loadedVoteDates$, this.updatedVoteDates$)),
      map((dates) => dates.slice())
    ),
    this.clearDates$.pipe(map(() => []))
  );

  public readonly startTime = signal(format(new Date(), timeFormat));
  public readonly endTime = signal(format(new Date(), timeFormat));
  
  public readonly isTimeInvalid = computed(() => {
    const startDate = new Date(this.startTime());
    const endDate = new Date(this.endTime());
    return startDate >= endDate;
  });

  private readonly toast = inject(ToastService);
  private readonly tools = inject(SmallToolsService);
  public readonly isTouchDevice = this.tools.isTouchDevice;

  private readonly localizeService = inject(LocalizeService);
  public readonly localizeFormat$ = this.localizeService.localizationWithFormat$;
  public readonly VoteCalendarLocalize = VoteCalendarLocalize;

  constructor() { }

  public updateTime(voteDate?: VoteDate): void {
    const nowTime = format(new Date(), timeFormat);
    const startValue = voteDate?.start
      ? format(voteDate.start, timeFormat)
      : nowTime;
    const endValue = voteDate?.end
      ? format(voteDate.end, timeFormat)
      : nowTime;
      
    this.startTime.set(startValue);
    this.endTime.set(endValue);
  }

  public toastOnSave(): void {

  }
  
}
