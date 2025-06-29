import { computed, Directive, input, signal } from '@angular/core';
import { fakeDates } from 'src/app/core/mock-data';
import { VoteType } from '../vote-calendar/models';

@Directive({
  selector: '[appResultView]'
})
export class ResultViewDirective {
  // filters
  public readonly min = input.required<number>();
  public readonly maybe = input.required<boolean>();
  public readonly time = input.required<boolean>();

  public readonly dates = signal(fakeDates);

  public readonly filteredDates = computed(() => {
    return this.dates().filter((date) =>
      date.users.length >= this.min()
      && (this.maybe() || date.type !== VoteType.Maybe)
      && (this.time() || date.type !== VoteType.Time)
    );
  });
  
  constructor() { }
}