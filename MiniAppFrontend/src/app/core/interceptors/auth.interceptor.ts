import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { TelegramService } from '../services';
import { environment } from 'src/environments/environment';
import { tgToken } from './auth-test-tokens';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const headerName = 'Authorization';
  const tg = inject(TelegramService);
  const initData$ = environment.isTelegramMiniApp ? tg.initData$ : of(tgToken);
  return initData$.pipe(
    switchMap((data) => {
      const cloned = req.clone({ headers: req.headers.append(headerName, data )});
      return next(cloned);
    })
  );
}
