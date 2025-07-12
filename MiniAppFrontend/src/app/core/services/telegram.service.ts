import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, of, shareReplay, take, tap } from 'rxjs';
import { AppColorScheme } from './theme.service';
import { environment } from 'src/environments/environment';
import { Localization } from 'src/app/shared/localize';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly router = inject(Router);
  private readonly miniApp$ = this.getTelegramMiniApp();

  public readonly initData$ = this.miniApp$.pipe(
    map((miniApp) => miniApp?.initData as string),
    filter(Boolean),
    shareReplay(1)
  );

  public readonly colorScheme$ = this.miniApp$.pipe(
    map((miniApp) => miniApp?.colorScheme as AppColorScheme),
    filter(Boolean),
    shareReplay(1)
  );

  public readonly userId$ = this.miniApp$.pipe(
    map((miniApp) => miniApp?.initDataUnsafe?.user?.id as number),
    filter(Boolean),
    shareReplay(1)
  );

  public readonly languageCode$ = this.miniApp$.pipe(
    map((miniApp) => miniApp?.initDataUnsafe?.user?.language_code as Localization),
    filter(Boolean),
    shareReplay(1)
  );

  constructor() { }

  public initApp(): Observable<string | undefined> {
    return this.miniApp$.pipe(
      take(1),
      filter(() => window.location.pathname === '/'),
      map((miniApp) => miniApp?.initDataUnsafe.start_param),
      tap((command) => {
        if (command?.startsWith('event')) {
          const eventId = command.replace('event', '');
          this.router.navigate(['vote', eventId]);
        } else {
          this.router.navigate(['edit']);
        }
      })
    );
  }

  public share(url: string, text?: string): void {
    const tgUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    this.miniApp$.subscribe((val) => val.openTelegramLink(tgUrl));
  }

  private getTelegramMiniApp(): Observable<any> {
    return !environment.isTelegramMiniApp
      ? of(null)
      : of((window as any).Telegram?.WebApp).pipe(
          filter(Boolean),
          shareReplay(1)
        );
  }
}
