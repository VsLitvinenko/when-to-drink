import { AfterViewInit, Directive, ElementRef, inject, OnDestroy, Output } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, merge, Observable, pairwise, ReplaySubject, startWith, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResultViewDirective } from '../result-view.directive';
import { ResultDate } from '../models';


interface DateSelectedEvent {
  prevBgColor: string;
  prevColor: string;
  buttonEl: HTMLButtonElement;
  voteDate?: ResultDate;
}

@Directive({
  selector: '[appResultViewCalendarPicker]'
})
export class ResultViewCalendarPickerDirective implements AfterViewInit, OnDestroy{

  private readonly data = inject(ResultViewDirective);
  private readonly elRef = inject(ElementRef);
  private get rootEl(): HTMLElement {
    return this.elRef.nativeElement.shadowRoot;
  }

  private readonly rootObs = new MutationObserver(() => {
    const dateButtons = this.rootEl.querySelectorAll('button.calendar-day');
    this.dateButtons$.next(Array.from(dateButtons) as any);
  });

  private readonly dateButtons$ = new ReplaySubject<HTMLButtonElement[]>(1);

  private readonly voteDateSelected$ = this.dateButtons$.pipe(
    tap((dateButtons) => dateButtons.forEach((b) => b.style.boxShadow = 'none')),
    switchMap((dateButtons) => {
      const buttonClicks = dateButtons.map((target) => {
        return fromEvent(target, 'click', { capture: true }).pipe(
          tap((event) => event.stopPropagation()),
          map(() => target)
        );
      });
      return merge(...buttonClicks);
    }),
    distinctUntilChanged((prev, curr) => !this.noActionsAfterReset && prev === curr),
    map((buttonEl) => this.getDateSelectedEvent(buttonEl)),
    map((event) => event.voteDate ? event : undefined),
    startWith(undefined),
    pairwise(),
    tap(([oldEvent, newEvent]) => this.handleButtonStyles(oldEvent, newEvent)),
    map(([oldEvent, newEvent]) => newEvent?.voteDate),
    tap(() => this.noActionsAfterReset = false),
  );

  // clear selected date if buttons or filters was updated
  private noActionsAfterReset: boolean = true;

  @Output() dateSelected = merge(
    this.voteDateSelected$ as Observable<ResultDate | undefined>,
    this.getResetDateEvent(this.dateButtons$),
    this.getResetDateEvent(toObservable(this.data.filteredDates))
  );

  constructor() { }

  ngAfterViewInit(): void {
    this.rootObs.observe(this.rootEl, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.dateButtons$.complete();
    this.rootObs.disconnect();
  }

  private getResetDateEvent(obs$: Observable<any>): Observable<undefined> {
    return obs$.pipe(
      tap(() => this.noActionsAfterReset = true),
      map(() => undefined)
    );
  }

  private getDateSelectedEvent(buttonEl: HTMLButtonElement): DateSelectedEvent {
    const day = Number(buttonEl.getAttribute('data-day'));
    const month = Number(buttonEl.getAttribute('data-month'));
    const year = Number(buttonEl.getAttribute('data-year'));
    const date = new Date(year, month - 1, day);
    return {
      prevBgColor: buttonEl.style.backgroundColor,
      prevColor: buttonEl.style.color,
      voteDate: this.data.getVoteDate(date),
      buttonEl,
    };
  }

  private handleButtonStyles(oldEvent?: DateSelectedEvent, newEvent?: DateSelectedEvent): void {
    if (oldEvent && !this.noActionsAfterReset) {
      // return prev style if needed
      const el = oldEvent.buttonEl;
      el.style.backgroundColor = oldEvent.prevBgColor;
      el.style.color = oldEvent.prevColor;
    }
    if (newEvent) {
      // update new button style
      const el = newEvent.buttonEl;
      el.style.backgroundColor = el.style.color;
      el.style.color = 'var(--ion-color-contrast)';
    }
  }
}