import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { PreventContextDirective, VoteDataDirective, VoteHandleClickDirective, VoteHandlePopoverDirective } from './directives';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { format } from 'date-fns';
import { VoteDate } from './models';
import { FormsModule } from '@angular/forms';
import { SmallToolsService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { VoteCalendarLocalize } from './vote-calendar.localize';
import { EventVote, VoteCalendarRequestService } from './vote-calendar-request.service';
import { finalize, map, merge, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { FeatureLoadDirective } from 'src/app/shared/directives';

const timeFormat = "yyyy-MM-dd'T'HH:mm:ss";

@Component({
  selector: 'app-vote-calendar',
  templateUrl: './vote-calendar.component.html',
  styleUrls: ['./vote-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SharedFeatureModule,
    IonDatetime,
    IonChip,
    IonPopover,
    IonModal,
    FormsModule,
    VoteDataDirective,
    VoteHandleClickDirective,
    VoteHandlePopoverDirective,
    PreventContextDirective,
  ],
})
export class VoteCalendarComponent {
  public readonly eventId = input.required<string>();
  public readonly minDate = input();
  public readonly maxDate = input();
  public readonly voteUpdated = output<EventVote>();

  // update vote dates event
  public readonly resetDates$ = new Subject<boolean>();
  public readonly clearDates$ = new Subject<boolean>();
  public readonly saveDates$ = new Subject<VoteDate[]>();

  private readonly request = inject(VoteCalendarRequestService);
  private readonly featureLoad = inject(FeatureLoadDirective, { optional: true });

  // get init data
  private readonly loadedEventVote$ = toObservable(this.eventId).pipe(
    tap(() => this.featureLoad?.incrLoading()),
    switchMap((eventId) =>
      this.request.getEventVote(eventId)
        .pipe(finalize(() => this.featureLoad?.decrLoading()))
    ),
    shareReplay(1)
  );

  // update data
  private readonly updatedEventVote$ = this.saveDates$.pipe(
    tap(() => this.featureLoad?.incrLoading()),
    switchMap((dates) =>
      this.request.updateEventVote(this.eventId(), dates)
        .pipe(finalize(() => this.featureLoad?.decrLoading()))
    ),
    tap((eventVote) => this.voteUpdated.emit(eventVote)),
    tap(() => {
      const message = this.loc.localizeSync(VoteCalendarLocalize.HasBeenSaved);
      this.toast.info(message, 'cloud-done-outline');
    }),
    shareReplay(1)
  );

  // main data obs
  public readonly voteDates$: Observable<VoteDate[]> = merge(
    this.clearDates$.pipe(map(() => [])),
    this.resetDates$.pipe(
      startWith(true),
      switchMap(() => merge(this.loadedEventVote$, this.updatedEventVote$)),
      map((eventVote) => eventVote.dates.slice())
    ),
  );
  
  public readonly startTime = signal(format(new Date(), timeFormat));
  public readonly endTime = signal(format(new Date(), timeFormat));
  public lastAppliedStartTime = this.startTime();
  public lastAppliedEndTime = this.endTime();
  
  public readonly isTimeInvalid = computed(() => {
    const startDate = new Date(this.startTime());
    const endDate = new Date(this.endTime());
    return startDate >= endDate;
  });

  private readonly toast = inject(ToastService);
  private readonly tools = inject(SmallToolsService);
  public readonly isTouchDevice = this.tools.isTouchDevice;

  private readonly loc = inject(LocalizeService);
  public readonly localizeFormat$ = this.loc.localizationWithFormat$;
  public readonly VoteCalendarLocalize = VoteCalendarLocalize;

  constructor() { }

  public updateTime(voteDate?: VoteDate): void {
    const startValue = voteDate?.start
      ? format(voteDate.start, timeFormat)
      : this.lastAppliedStartTime;
    const endValue = voteDate?.end
      ? format(voteDate.end, timeFormat)
      : this.lastAppliedEndTime;
      
    this.startTime.set(startValue);
    this.endTime.set(endValue);
  }
  
}
