import { Injectable } from '@angular/core';
import { fromEvent, map, merge, startWith, Subject } from 'rxjs';

export type AppColorScheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly darkThemeCssClass = 'ion-palette-dark';
  private readonly manuallyUpdate$ = new Subject<AppColorScheme>();

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const matchMediaScheme$ = fromEvent(prefersDark, 'change').pipe(
      startWith(prefersDark),
      map((event: any) => event.matches ? 'dark' : 'light')
    );

    merge(this.manuallyUpdate$, matchMediaScheme$)
      .subscribe((colorScheme) => this.toggleDarkPalette(colorScheme));
  }

  public changeColorScheme(colorScheme: AppColorScheme): void {
    this.manuallyUpdate$.next(colorScheme);
  }

  private toggleDarkPalette(colorScheme: AppColorScheme): void {
    const shouldAdd = colorScheme === 'dark';
    document.documentElement.classList.toggle(this.darkThemeCssClass, shouldAdd);
  }
}
