import { inject, Injectable } from '@angular/core';
import { combineLatest, filter, finalize, map, Observable, of, shareReplay, switchMap, take, tap } from 'rxjs';
import { AppColorScheme } from './theme.service';
import { environment } from 'src/environments/environment';
import { Localization } from 'src/app/shared/localize';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  private readonly tgBotUrl$ = this.http.get<any>('utils/bot-url').pipe(
    map((res) => res.botUrl),
    shareReplay(1)
  );

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

  public initApp(): Observable<any> {
    return this.miniApp$.pipe(
      take(1),
      switchMap((miniApp) => of(window.location.pathname).pipe(
        tap(() => console.log('appInit', window.location)),
        filter((path) => path === environment.baseHref),
        // redirect if path is empty
        tap(() => {
          const command = miniApp?.initDataUnsafe.start_param;
          if (command?.startsWith('event')) {
            const eventId = command.replace('event', '');
            this.router.navigate(['vote', eventId]);
          } else {
            this.router.navigate(['edit']);
          }
        }),
        // mark telegram that app is ready
        finalize(() => miniApp?.ready ? miniApp.ready() : null)
      ))
    );
  }

  public getEventTgLink(eventId: string): Observable<string> {
    return this.tgBotUrl$.pipe(map((botUrl) => `${botUrl}?startapp=event${eventId}`));
  }

  public shareEvent(eventId: string, eventName?: string): void {
    combineLatest([this.getEventTgLink(eventId), this.miniApp$])
      .pipe(take(1))
      .subscribe(([eventUrl, miniApp]) => {
        const url = `https://t.me/share/url?url=${eventUrl}&text=${eventName ?? ''}`;
        miniApp?.openTelegramLink(url);
      });
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
