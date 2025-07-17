import { Observable, switchMap, takeUntil, timer, merge, fromEvent, map } from 'rxjs';

export const touchHoldEvent = (
  target: HTMLElement,
  delay: number = 500
): Observable<Event> => {
  const touchStart$ = fromEvent(target, 'touchstart');
  const touchEnd$ = fromEvent(target, 'touchend');
  const touchMove$ = fromEvent(target, 'touchmove');
  return touchStart$.pipe(
    switchMap((event) => {
      return timer(delay).pipe(
        map(() => event),
        takeUntil(merge(touchEnd$, touchMove$)),
      );
    }),
  );
};
