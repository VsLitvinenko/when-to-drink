import { ChangeDetectionStrategy, Component, computed, inject, input, Output, output, signal, viewChild } from '@angular/core';
import { PreventContextDirective, VoteDataDirective, VoteHandleClickDirective, VoteHandlePopoverDirective } from './directives';
import { distinctUntilChanged, finalize, map, merge, Observable, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { format } from 'date-fns';
import { TimeModalDataAction, VoteDate, VoteType } from './models';
import { FormsModule } from '@angular/forms';
import { SmallToolsService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { VoteCalendarLocalize } from './vote-calendar.localize';
import { EventVote, VoteCalendarRequestService } from './vote-calendar-request.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { FeatureLoadDirective } from 'src/app/shared/directives';
import { isEqual } from 'lodash';

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
  private readonly appVoteData = viewChild(VoteDataDirective);
  private readonly voteDatesFromCalendar = computed(() => this.appVoteData()?.voteDatesSignal());

  public readonly eventId = input.required<string>();
  public readonly minDate = input();
  public readonly maxDate = input();
  public readonly voteUpdated = output<EventVote>();

  // update vote dates event
  public readonly resetDates$ = new Subject<boolean>();
  public readonly clearDates$ = new Subject<boolean>();
  public readonly saveDates$ = new Subject<boolean>();

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
    map(() => this.voteDatesFromCalendar() ?? []),
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

  // sync with latest sever data
  private readonly stagedVoteDates$ = merge(this.loadedEventVote$, this.updatedEventVote$).pipe(
    map((eventVote) => eventVote.dates),
    shareReplay(1)
  );

  // main data obs
  public readonly voteDates$: Observable<VoteDate[]> = merge(
    this.clearDates$.pipe(map(() => [])),
    this.resetDates$.pipe(
      startWith(true),
      switchMap(() => this.stagedVoteDates$),
      map((dates) => dates.slice())
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

  public timeModalDataAction = signal<TimeModalDataAction | undefined>(undefined);

  private readonly toast = inject(ToastService);
  private readonly tools = inject(SmallToolsService);
  public readonly isTouchDevice = this.tools.isTouchDevice;

  public readonly VoteType = VoteType;
  public defaultVoteType: VoteType = VoteType.Ready;

  private readonly loc = inject(LocalizeService);
  public readonly localizeFormat$ = this.loc.localizationWithFormat$;
  public readonly VoteCalendarLocalize = VoteCalendarLocalize;

  @Output() noUnsavedChanges = toObservable(this.voteDatesFromCalendar).pipe(
    withLatestFrom(this.stagedVoteDates$),
    map(([current, staged]) => isEqual(current, staged)),
    distinctUntilChanged(),
    shareReplay(1)
  );

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

  public onTimeSelected(timeModal: IonModal): void {
    timeModal.dismiss();
    this.lastAppliedStartTime = this.startTime();
    this.lastAppliedEndTime = this.endTime();
    const action = this.timeModalDataAction();
    if (action) {
      action({ time: true, start: this.startTime(), end: this.endTime() });
      this.timeModalDataAction.set(undefined);
    }
  }
  
}
