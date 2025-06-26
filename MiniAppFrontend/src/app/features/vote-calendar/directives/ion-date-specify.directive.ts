import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import { fromEvent, map, merge, ReplaySubject, switchMap, take, takeUntil, tap } from 'rxjs';
import { IonButton, IonDatetime, IonPopover } from '@ionic/angular/standalone';


const focusButtonBg = 'rgba(var(--ion-color-base-rgb), 0.2)';

@Directive({
  selector: '[appIonDateSpecify]',
})
export class IonDateSpecifyDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true}) popover!: IonPopover;
  @Input() readyButton?: IonButton;
  @Input() maybeButton?: IonButton;
  @Input() timeButton?: IonButton;

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

  constructor() {}

  ngAfterViewInit(): void {
    // update dateButtons$ array
    this.rootObs.observe(this.rootEl, { childList: true, subtree: true });
    // get date buttons hold events
    this.dateButtons$
      .pipe(
        tap((dateButtons) => dateButtons.forEach((b) => b.style.boxShadow = 'none')),
        switchMap((dateButtons) => {
          const buttonClicks = dateButtons.map((target) => {
            return fromEvent(target, 'contextmenu').pipe(
              tap((event) => event.preventDefault()),
              map((event) => ({ ...event, target, }))
            );
          });
          return merge(...buttonClicks);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((event: any) => this.showPopover(event));
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
    this.popover.willPresent
      .pipe(take(1))
      .subscribe(() => buttonEl.style.backgroundColor = focusButtonBg);
    // remove style and handle buttons if needed
    this.popover.willDismiss
      .pipe(take(1))
      .subscribe((event) => {
        buttonEl.style.backgroundColor = '';
        this.handlePopoverButtons(event.detail.data, buttonEl);
      });
  }

  private handlePopoverButtons(event: any, target: HTMLButtonElement): void {
    if (!event) {
      return;
    }
    const day = Number(target.getAttribute('data-day'));
    const month = Number(target.getAttribute('data-month'));
    const year = Number(target.getAttribute('data-year'));
    const date = new Date(year, month - 1, day);
    console.log(event, date);
  }
}
