import { computed, Directive, inject, input } from '@angular/core';
import { VoteType } from '../vote-calendar/models';
import { format, startOfDay } from 'date-fns';
import { ResultDate } from './models';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { shareReplay, switchMap } from 'rxjs';
import { ResultViewRequestService } from './result-view-request.service';

@Directive({
  selector: '[appResultView]'
})
export class ResultViewDirective {
  public readonly eventId = input.required<string>();
  // filters
  public readonly min = input.required<number>();
  public readonly maybe = input.required<boolean>();
  public readonly time = input.required<boolean>();
  public readonly trimPast = input.required<boolean>();

  private readonly request = inject(ResultViewRequestService);

  private readonly dates$ = toObservable(this.eventId).pipe(
    switchMap((eventId) => this.request.getEventResults(eventId)),
    shareReplay(1)
  );

  private readonly dates = toSignal(this.dates$, { initialValue: [] });
  private readonly today = startOfDay(new Date());

  public readonly filteredDates = computed(() => {
    return this.dates().filter((date) =>
      date.users.length >= this.min()
      && (!this.trimPast() || date.date >= this.today)
      && (this.maybe() || date.voteType !== VoteType.Maybe)
      && (this.time() || date.voteType !== VoteType.Time)
    );
  });

  private readonly filteredDatesMap = computed(() => {
    const filteredDates = this.filteredDates();
    return new Map(filteredDates.map((i) => [this.formatVoteDate(i.date), i]));
  });
  
  constructor() { }

  public formatVoteDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  public getVoteDate(date: Date): ResultDate | undefined {
    const formatted = this.formatVoteDate(date);
    return this.filteredDatesMap().get(formatted);
  }
}