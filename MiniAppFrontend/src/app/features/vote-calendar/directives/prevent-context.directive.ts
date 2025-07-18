import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { IonPopover } from '@ionic/angular/standalone';
import { filter, fromEvent, Subject, switchMap, takeUntil } from 'rxjs';

@Directive({
  selector: '[appPreventContext]'
})
export class PreventContextDirective implements OnInit, OnDestroy {

  private readonly popover = inject(IonPopover);
  private readonly destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.popover.willPresent.pipe(
      filter((e) => !!e.target),
      switchMap((e) => fromEvent(e.target!, 'contextmenu')),
      takeUntil(this.destroyed$)
    ).subscribe((e) => e.preventDefault());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.complete();
  }
}