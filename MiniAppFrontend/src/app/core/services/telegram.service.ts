import { Injectable } from '@angular/core';
import { EMPTY, filter, map, Observable, of, shareReplay } from 'rxjs';
import { AppColorScheme } from './theme.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly miniApp$ = this.getTelegramMiniApp();

  public readonly colorScheme$ = this.miniApp$.pipe(
    map((miniApp) => miniApp.colorScheme as AppColorScheme),
    shareReplay(1)
  );

  constructor() { }

  public initApp(): void {
    this.miniApp$.subscribe((val) => console.log(val));
  }

  private getTelegramMiniApp(): Observable<any> {
    return !environment.isTelegramMiniApp
      ? EMPTY
      : of((window as any).Telegram).pipe(
          filter(Boolean),
          map((tg) => tg.WebApp),
          shareReplay(1)
        );
  }
}
