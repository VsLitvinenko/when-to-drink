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
    filter(Boolean),
    shareReplay(1)
  );

  public readonly languageCode$ = this.miniApp$.pipe(
    map((miniApp) => miniApp.initDataUnsafe?.user?.language_code),
    filter(Boolean),
    shareReplay(1)
  );

  constructor() { }

  public initApp(): void {
    this.miniApp$.subscribe((val) => console.log(val));
  }

  public share(url: string, text?: string): void {
    const tgUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    this.miniApp$.subscribe((val) => val.openTelegramLink(tgUrl));
  }

  private getTelegramMiniApp(): Observable<any> {
    return !environment.isTelegramMiniApp
      ? EMPTY
      : of((window as any).Telegram?.WebApp).pipe(
          filter(Boolean),
          shareReplay(1)
        );
  }
}
