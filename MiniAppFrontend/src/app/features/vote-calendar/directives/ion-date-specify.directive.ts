import { AfterViewInit, Directive, effect, ElementRef, inject, Input, OnDestroy, Output, signal } from '@angular/core';
import { fromEvent, map, merge, ReplaySubject, switchMap, take, takeUntil, tap, throttleTime } from 'rxjs';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { touchHoldEvent } from 'src/app/shared/helpers';
import { VoteDate, VoteType } from '../models';
import { groupBy } from 'lodash';
import { format } from 'date-fns';

const focusButtonBg = 'var(--ion-background-color-step-50, #fff)';
const formatVoteDate = (date: Date) => format(date, 'yyyy-MM-dd');

@Directive({
  selector: '[appIonDateSpecify]',
  exportAs: 'appIonDateSpecify',
})
export class IonDateSpecifyDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true}) popover!: IonPopover;

  @Input() set voteDates(items: VoteDate[]) {
    const grouped = groupBy(items, 'type');
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
      ...Array.from(ready).map((date) => ({ date: new Date(date), type: VoteType.Ready })),
      ...Array.from(maybe).map((date) => ({ date: new Date(date), type: VoteType.Maybe })),
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
      const readyDates = this.readyDates();
      this.ionDateComponent.value = Array.from(readyDates);
    });

    effect(() => {
      // highlight dates in ion-datetime
      const maybeDates = this.maybeDates();
      const timeDates = this.timeDates();
      this.ionDateComponent.highlightedDates = [
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
    // get date buttons hold events
    this.dateButtons$
      .pipe(
        tap((dateButtons) => dateButtons.forEach((b) => {
          b.style.boxShadow = 'none';
          b.style.fontWeight = '400';
          b.style.fontSize = '1.25rem';
          b.style.transition = 'background-color 250ms, color 250ms';
        })),
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
    // sync dates signals with ion-datetime value
    this.ionDateComponent.ionChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event) => {
        this.readyDates().clear();
        const value = event.detail.value as (string[] | undefined);
        value?.forEach((date) => {
          this.readyDates().add(date);
          this.maybeDates().delete(date);
          this.timeDates().delete(date);
        });
        this.emitAllDatesSignals();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.dateButtons$.complete();
    this.rootObs.disconnect();
  }

  private showPopover(event: PointerEvent): void {
    const buttonEl = event.target as HTMLButtonElement;
    this.popover.present(event);
    // add style
    const prevButtonBgColor = buttonEl.style.backgroundColor ?? '';
    this.popover.willPresent
      .pipe(take(1))
      .subscribe(() => {
        this.lastFocusedDateButton$.next(buttonEl);
        buttonEl.style.backgroundColor = focusButtonBg;
      });
    // remove style and handle buttons if needed
    this.popover.willDismiss
      .pipe(take(1))
      .subscribe((event) => {
        this.lastFocusedDateButton$.next(undefined);
        buttonEl.style.backgroundColor = prevButtonBgColor;
        if (event.detail.data) {
          const day = Number(buttonEl.getAttribute('data-day'));
          const month = Number(buttonEl.getAttribute('data-month'));
          const year = Number(buttonEl.getAttribute('data-year'));
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
        type: VoteType.Time,
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
}
