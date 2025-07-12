import { Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appFeatureLoad]',
  exportAs: 'appFeatureLoad',
})
export class FeatureLoadDirective implements OnInit, OnDestroy {
  @Input() set placeholderOpacity(opacity: string) {
    this.placeholderEl.style.opacity = opacity;
  }

  private readonly elRef = inject(ElementRef);
  private get el(): HTMLElement {
    return this.elRef.nativeElement;
  }

  private readonly placeholderEl = this.createPlaceholderEl();
  private readonly loadingCounter$ = new BehaviorSubject<number>(0);

  public readonly loading$ = this.loadingCounter$.pipe(
    map((counter) => counter > 0),
    distinctUntilChanged(),
  );

  private readonly destroyed$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.el.style.position = 'relative';
    this.loading$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((show) => show ? this.onLoadStarts() : this.onLoadEnds());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.complete();
  }

  public incrLoading(): void {
    this.loadingCounter$.next(this.loadingCounter$.value + 1);
  }

  public decrLoading(): void {
    this.loadingCounter$.next(this.loadingCounter$.value - 1);
  }

  private onLoadStarts(): void {
    this.el.appendChild(this.placeholderEl);
  }

  private onLoadEnds(): void {
    this.placeholderEl.remove();
  }

  private createPlaceholderEl(): HTMLDivElement {
    const res = document.createElement('div');
    res.style.zIndex = '2';
    res.style.position = 'absolute';
    res.style.top = '0';
    res.style.bottom = '0';
    res.style.left = '0';
    res.style.right = '0';
    res.style.pointerEvents = 'none';
    res.style.borderRadius = '0.5rem';
    res.className = 'skeleton-placeholder';
    return res;
  }
}