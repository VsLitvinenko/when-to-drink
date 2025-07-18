import { AfterViewInit, Directive, effect, ElementRef, inject, Input, OnDestroy, Output, signal } from '@angular/core';
import { fromEvent, map, merge, ReplaySubject, switchMap, take, takeUntil, tap, throttleTime } from 'rxjs';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { touchHoldEvent } from 'src/app/shared/helpers';
import { VoteDate, VoteType } from '../models';
import { groupBy } from 'lodash';
import { format } from 'date-fns';

const formatVoteDate = (date: Date) => format(date, 'yyyy-MM-dd');

@Directive({
  selector: '[appIonDateSpecify]',
  exportAs: 'appIonDateSpecify',
})
export class IonDateSpecifyDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true}) popover!: IonPopover;

  @Input() set voteDates(items: VoteDate[]) {
    const grouped = groupBy(items, 'voteType');
    const ready = grouped[VoteType.Ready] ?? [];
    const maybe = grouped[VoteType.Maybe] ?? [];
    const time = grouped[VoteType.Time] ?? [];
    this.readyDates.set(new Set(ready.map((d) => formatVoteDate(d.date))));
    this.maybeDates.set(new Set(maybe.map((d) => formatVoteDate(d.date))));
    this.timeDates.set(new Map(time.map((d) => [formatVoteDate(d.date), d])));
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

  private readonly readyDates = signal(new Set<string>());
  private readonly maybeDates = signal(new Set<string>());
  private readonly timeDates = signal(new Map<string, VoteDate>());

  private readonly lastFocusedDateButton$ = new ReplaySubject<HTMLButtonElement | undefined>(1);
  @Output() focusedTimeChanges = this.lastFocusedDateButton$.pipe(
    map((el) => {
      if (!el) { return undefined; }
      const day = Number(el.getAttribute('data-day'));
      const month = Number(el.getAttribute('data-month'));
      const year = Number(el.getAttribute('data-year'));
      const date = new Date(year, month - 1, day);
      return this.timeDates().get(formatVoteDate(date));
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

  private readonly dateButtons$ = new ReplaySubject<HTMLButtonElement[]>(1);
  private readonly destroyed$ = new ReplaySubject<void>(1);

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
    this.buttonsClickSubscribe();
    this.buttonsPopoverSubscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.dateButtons$.complete();
    this.rootObs.disconnect();
  }

  private buttonsClickSubscribe(): void {
    this.dateButtons$
      .pipe(
        switchMap((dateButtons) => {
          const buttonClicks = dateButtons.map((target) => {
            return fromEvent(target, 'click', { capture: true }).pipe(
              tap((event) => event.stopPropagation()),
              map(() => (target))
            );
          });
          return merge(...buttonClicks);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((buttonEl) => {
        const { day, month, year } = this.getDataFromButton(buttonEl);
        const date = formatVoteDate(new Date(year, month - 1, day));
        if (this.readyDates().has(date)) {
          this.readyDates().delete(date);
        } else if (this.maybeDates().has(date)) {
          this.maybeDates().delete(date);
        } else if (this.timeDates().has(date)) {
          this.timeDates().delete(date);
        } else {
          this.readyDates().add(date);
        }
        this.emitAllDatesSignals();
      });
  }

  private buttonsPopoverSubscribe(): void {
    this.dateButtons$
      .pipe(
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
        takeUntil(this.destroyed$)
      )
      .subscribe((event: any) => this.showPopover(event));
  }

  private showPopover(event: PointerEvent): void {
    const buttonEl = event.target as HTMLButtonElement;
    this.popover.present(event);
    // add style
    this.popover.willPresent
      .pipe(take(1))
      .subscribe(() => {
        this.lastFocusedDateButton$.next(buttonEl);
        buttonEl.style.opacity = '0.65';
      });
    // remove style and handle buttons if needed
    this.popover.willDismiss
      .pipe(take(1))
      .subscribe((event) => {
        this.lastFocusedDateButton$.next(undefined);
        buttonEl.style.opacity = '';
        if (event.detail.data) {
          const { day, month, year } = this.getDataFromButton(buttonEl);
          this.handlePopoverButtons(event.detail.data, year, month, day);
        }
      });
  }

  private handlePopoverButtons(event: any, year: number, month: number, day: number): void {
    const date = new Date(year, month - 1, day);
    const formatted = formatVoteDate(date);
    if (event.ready) {
      // handle ready date
      this.readyDates().add(formatted);
      this.maybeDates().delete(formatted);
      this.timeDates().delete(formatted);
    } else if (event.maybe) {
      // handle maybe date
      this.maybeDates().add(formatted);
      this.readyDates().delete(formatted);
      this.timeDates().delete(formatted);
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
      this.timeDates().set(formatted, voteDate);
      this.readyDates().delete(formatted);
      this.maybeDates().delete(formatted);
    }
    this.emitAllDatesSignals();
  }

  private emitAllDatesSignals(): void {
    // update all signals to trigger change detection
    this.readyDates.set(new Set(this.readyDates()));
    this.maybeDates.set(new Set(this.maybeDates()));
    this.timeDates.set(new Map(this.timeDates()));
  }

  private getDataFromButton(buttonEl: HTMLElement): any {
    const day = Number(buttonEl.getAttribute('data-day'));
    const month = Number(buttonEl.getAttribute('data-month'));
    const year = Number(buttonEl.getAttribute('data-year'));
    return { day, month, year };
  }
}
