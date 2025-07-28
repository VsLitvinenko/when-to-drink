import { AfterViewInit, Directive, inject, Input, Output } from '@angular/core';
import { VoteDataDirective } from './vote-data.directive';
import { fromEvent, map, merge, Subject, switchMap, take, tap, throttleTime } from 'rxjs';
import { IonPopover } from '@ionic/angular/standalone';
import { touchHoldEvent } from 'src/app/shared/helpers';
import { VoteDate, VoteType } from '../models';

@Directive({
  selector: '[appVoteHandlePopover]',
})
export class VoteHandlePopoverDirective implements AfterViewInit {
  @Input({ required: true }) appVoteHandlePopover!: IonPopover;
  private readonly data = inject(VoteDataDirective);
  private readonly lastFocusedButton$ = new Subject<HTMLButtonElement | undefined>();

  @Output() focusedDateChanges = this.lastFocusedButton$.pipe(
    map((el) => {
      if (!el) { return undefined; }
      const { day, month, year } = this.data.getDataFromButton(el);
      const date = new Date(year, month - 1, day);
      const formatted = this.data.formatVoteDate(date);
      if (this.data.readyDates().has(formatted)) {
        return { date, voteType: VoteType.Ready }
      } else if (this.data.maybeDates().has(formatted)) {
        return { date, voteType: VoteType.Maybe };
      } else {
        return this.data.timeDates().get(formatted);
      }
    })
  );

  ngAfterViewInit(): void {
    // completes on VoteDataDirective destroy
    this.data.dateButtons$.pipe(
      switchMap((dateButtons) => {
        const buttonClicks = dateButtons.map((target) => {
          const menuEvent$ = fromEvent(target, 'contextmenu');
          const touchEvent$ = touchHoldEvent(target);
          // any of right click or touch events
          return merge(menuEvent$, touchEvent$).pipe(
            tap((event) => event.preventDefault()),
            map((event) => ({ ...event, target, })),
            throttleTime(500),
          );
        });
        return merge(...buttonClicks);
      }),
    ).subscribe((event: any) => this.showPopover(event));
  }

  private showPopover(event: PointerEvent): void {
    const buttonEl = event.target as HTMLButtonElement;
    this.lastFocusedButton$.next(buttonEl);
    this.appVoteHandlePopover.present(event);
    // add style
    this.appVoteHandlePopover.willPresent
      .pipe(take(1))
      .subscribe(() => buttonEl.style.opacity = '0.7');
    // remove style and handle buttons if needed
    this.appVoteHandlePopover.didDismiss
      .pipe(take(1))
      .subscribe((event) => {
        this.lastFocusedButton$.next(undefined);
        buttonEl.style.opacity = '';
        if (event.detail.data) {
          const { day, month, year } = this.data.getDataFromButton(buttonEl);
          this.handlePopoverButtons(event.detail.data, year, month, day);
        }
      });
  }

  private handlePopoverButtons(event: any, year: number, month: number, day: number): void {
    const date = new Date(year, month - 1, day);
    const formatted = this.data.formatVoteDate(date);
    if (event.clear || !event.ready && !event.maybe && !event.time) {
      // clear all if some action
      this.data.readyDates().delete(formatted);
      this.data.maybeDates().delete(formatted);
      this.data.timeDates().delete(formatted);
    }
    if (event.ready) {
      // handle ready date
      this.data.readyDates().add(formatted);
    } else if (event.maybe) {
      // handle maybe date
      this.data.maybeDates().add(formatted);
    } else if (event.time) {
      // handle time date
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      startDate.setFullYear(year, month - 1, day);
      endDate.setFullYear(year, month - 1, day);
      const voteDate: VoteDate = {
        date: date,
        voteType: VoteType.Time,
        start: startDate,
        end: endDate,
      };
      this.data.timeDates().set(formatted, voteDate);
    }
    this.data.emitAllDatesSignals();
  }

}