import { Injectable } from '@angular/core';
import { filter, map, of, shareReplay } from 'rxjs';
import { AppColorScheme } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly miniApp$ = of((window as any).Telegram).pipe(
    filter(Boolean),
    map((tg) => tg.WebApp),
    shareReplay(1)
  );

  public readonly colorScheme$ = this.miniApp$.pipe(
    map((miniApp) => miniApp.colorScheme as AppColorScheme),
    shareReplay(1)
  );

  constructor() { }

  public initApp(): void {
    this.miniApp$.subscribe((val) => console.log(val));
  }
}
