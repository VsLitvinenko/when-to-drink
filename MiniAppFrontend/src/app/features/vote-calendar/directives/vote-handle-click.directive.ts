import { AfterViewInit, Directive, inject } from '@angular/core';
import { VoteDataDirective } from './vote-data.directive';
import { fromEvent, map, merge, switchMap, tap } from 'rxjs';

@Directive({
  selector: '[appVoteHandleClick]',
})
export class VoteHandleClickDirective implements AfterViewInit {
  
  private readonly data = inject(VoteDataDirective);

  ngAfterViewInit(): void {
    // completes on VoteDataDirective destroy
    this.data.dateButtons$.pipe(
      switchMap((dateButtons) => {
        const buttonClicks = dateButtons.map((target) => {
          return fromEvent(target, 'click', { capture: true }).pipe(
            tap((event) => event.stopPropagation()),
            map(() => (target))
          );
        });
        return merge(...buttonClicks);
      })
    ).subscribe((buttonEl) => this.handleClick(buttonEl));
  }

  private handleClick(buttonEl: HTMLButtonElement): void {
    const { day, month, year } = this.data.getDataFromButton(buttonEl);
    const date = this.data.formatVoteDate(new Date(year, month - 1, day));
    const readyDates = this.data.readyDates();
    const maybeDates = this.data.maybeDates();
    const timeDates = this.data.timeDates();
    // mutate data signals
    if (readyDates.has(date)) { readyDates.delete(date); }
    else if (maybeDates.has(date)) { maybeDates.delete(date);}
    else if (timeDates.has(date)) { timeDates.delete(date); }
    else { readyDates.add(date); }
    // emit changes
    this.data.emitAllDatesSignals();
  }
}