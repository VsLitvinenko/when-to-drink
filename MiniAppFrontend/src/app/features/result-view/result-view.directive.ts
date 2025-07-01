import { computed, Directive, input, signal } from '@angular/core';
import { fakeDates } from 'src/app/core/mock-data';
import { VoteType } from '../vote-calendar/models';
import { format, startOfDay } from 'date-fns';
import { ResultDate } from './models';

@Directive({
  selector: '[appResultView]'
})
export class ResultViewDirective {
  // filters
  public readonly min = input.required<number>();
  public readonly maybe = input.required<boolean>();
  public readonly time = input.required<boolean>();
  public readonly trimPast = input.required<boolean>();

  private readonly dates = signal(fakeDates);
  private readonly today = startOfDay(new Date());

  public readonly filteredDates = computed(() => {
    return this.dates().filter((date) =>
      date.users.length >= this.min()
      && (!this.trimPast() || date.date >= this.today)
      && (this.maybe() || date.type !== VoteType.Maybe)
      && (this.time() || date.type !== VoteType.Time)
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