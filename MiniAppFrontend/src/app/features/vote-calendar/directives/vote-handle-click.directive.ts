import { AfterViewInit, Directive, EventEmitter, inject, Input, Output } from '@angular/core';
import { VoteDataDirective } from './vote-data.directive';
import { fromEvent, map, merge, switchMap, tap } from 'rxjs';
import { TimeModalDataAction, TimeModalDataParam, VoteDate, VoteType } from '../models';

@Directive({
  selector: '[appVoteHandleClick]',
})
export class VoteHandleClickDirective implements AfterViewInit {
  @Input({ required: true }) appVoteHandleClick!: VoteType;
  @Output() timeModalAction = new EventEmitter<TimeModalDataAction>();

  private readonly data = inject(VoteDataDirective);

  private get currentSet(): Set<string> | Map<string, VoteDate> {
    switch (this.appVoteHandleClick) {
      case VoteType.Ready:
        return this.data.readyDates();
      case VoteType.Maybe:
        return this.data.maybeDates();
      case VoteType.Time:
        return this.data.timeDates();
    }
  }

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

  private async handleClick(buttonEl: HTMLButtonElement): Promise<void> {
    const { day, month, year } = this.data.getDataFromButton(buttonEl);
    const date = this.data.formatVoteDate(new Date(year, month - 1, day));
    if (this.currentSet.has(date)) {
      // remove date from current set
      this.currentSet.delete(date);
    } else {
      // add date to current set
      this.data.readyDates().delete(date);
      this.data.maybeDates().delete(date);
      this.data.timeDates().delete(date);
      await this.addDateToSet(buttonEl, date, year, month, day);
    }
    // emit changes
    this.data.emitAllDatesSignals();
  }

  private async addDateToSet(
    buttonEl: HTMLButtonElement,
    date: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> {
    switch (this.appVoteHandleClick) {
      case VoteType.Ready:
        this.data.readyDates().add(date);
        break;
      case VoteType.Maybe:
        this.data.maybeDates().add(date);
        break;
      case VoteType.Time:
        // open time modal and wait for user input
        buttonEl.style.opacity = '0.7';
        const action = new Promise<TimeModalDataParam>((r) => this.timeModalAction.emit(r));
        const voteDateData = await action;
        buttonEl.style.opacity = '';
        if (!voteDateData) { return; }
        const startDate = new Date(voteDateData.start);
        const endDate = new Date(voteDateData.end);
        startDate.setFullYear(year, month - 1, day);
        endDate.setFullYear(year, month - 1, day);
        const voteDate: VoteDate = {
          date: new Date(date),
          voteType: VoteType.Time,
          start: startDate,
          end: endDate,
        };
        this.data.timeDates().set(date, voteDate);
        break;
    }
  }
}