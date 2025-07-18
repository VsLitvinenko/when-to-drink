import { AfterViewInit, Directive, effect, ElementRef, inject, Input, OnDestroy, Output, signal } from '@angular/core';
import { IonDatetime } from '@ionic/angular/standalone';
import { VoteDate, VoteType } from '../models';
import { map, ReplaySubject } from 'rxjs';
import { groupBy } from 'lodash';
import { format } from 'date-fns';

@Directive({
  selector: '[appVoteData]',
  exportAs: 'appVoteData',
})
export class VoteDataDirective implements AfterViewInit, OnDestroy {
  @Input() set voteDates(items: VoteDate[]) {
    const grouped = groupBy(items, 'voteType');
    const ready = grouped[VoteType.Ready] ?? [];
    const maybe = grouped[VoteType.Maybe] ?? [];
    const time = grouped[VoteType.Time] ?? [];
    this.readyDates.set(new Set(ready.map((d) => this.formatVoteDate(d.date))));
    this.maybeDates.set(new Set(maybe.map((d) => this.formatVoteDate(d.date))));
    this.timeDates.set(new Map(time.map((d) => [this.formatVoteDate(d.date), d])));
  }

  public get voteDates(): VoteDate[] {
    const ready = this.readyDates();
    const maybe = this.maybeDates();
    const time = this.timeDates();
    return [
      ...Array.from(ready).map((date) => ({ date: new Date(date), voteType: VoteType.Ready })),
      ...Array.from(maybe).map((date) => ({ date: new Date(date), voteType: VoteType.Maybe })),
      ...Array.from(time.values())
    ];
  }

  public readonly readyDates = signal(new Set<string>());
  public readonly maybeDates = signal(new Set<string>());
  public readonly timeDates = signal(new Map<string, VoteDate>());

  public readonly lastFocusedDateButton$ = new ReplaySubject<HTMLButtonElement | undefined>(1);
  @Output() focusedTimeChanges = this.lastFocusedDateButton$.pipe(
    map((el) => {
      if (!el) { return undefined; }
      const day = Number(el.getAttribute('data-day'));
      const month = Number(el.getAttribute('data-month'));
      const year = Number(el.getAttribute('data-year'));
      const date = new Date(year, month - 1, day);
      return this.timeDates().get(this.formatVoteDate(date));
    })
  );

  private readonly ionDateComponent = inject(IonDatetime);
  private readonly elRef = inject(ElementRef);

  private get rootEl(): HTMLElement {
    return this.elRef.nativeElement.shadowRoot;
  }

  private readonly rootObs = new MutationObserver(() => {
    const dateButtons = this.rootEl.querySelectorAll('button.calendar-day');
    this.dateButtons$.next(Array.from(dateButtons) as any);
  });

  public readonly dateButtons$ = new ReplaySubject<HTMLButtonElement[]>(1);

  constructor() {
    effect(() => {
      // highlight dates in ion-datetime
      const readyDates = this.readyDates();
      const maybeDates = this.maybeDates();
      const timeDates = this.timeDates();
      this.ionDateComponent.highlightedDates = [
        ...Array.from(readyDates).map((date) => ({
          date: date,
          textColor: 'var(--ready-text-color)',
          backgroundColor: 'var(--ready-bg-color)',
        })),
        ...Array.from(maybeDates).map((date) => ({
          date: date,
          textColor: 'var(--maybe-text-color)',
          backgroundColor: 'var(--maybe-bg-color)',
        })),
        ...Array.from(timeDates.keys()).map((date) => ({
          date: date,
          textColor: 'var(--time-text-color)',
          backgroundColor: 'var(--time-bg-color)',
        })),
      ];
    });
  }

  ngAfterViewInit(): void {
    // update dateButtons$ array
    this.rootObs.observe(this.rootEl, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.dateButtons$.complete();
    this.rootObs.disconnect();
  }

  public emitAllDatesSignals(): void {
    // update all signals to trigger change detection
    this.readyDates.set(new Set(this.readyDates()));
    this.maybeDates.set(new Set(this.maybeDates()));
    this.timeDates.set(new Map(this.timeDates()));
  }

  public formatVoteDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  public getDataFromButton(buttonEl: HTMLElement): any {
    const day = Number(buttonEl.getAttribute('data-day'));
    const month = Number(buttonEl.getAttribute('data-month'));
    const year = Number(buttonEl.getAttribute('data-year'));
    return { day, month, year };
  }
}
