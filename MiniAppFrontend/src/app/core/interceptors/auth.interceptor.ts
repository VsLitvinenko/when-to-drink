import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { TelegramService } from '../services';
import { environment } from 'src/environments/environment';
import { tgToken } from './auth-test-tokens';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const headerName = 'Authorization';
  const cloned = req.clone({ headers: req.headers.append(headerName, tgToken )});
  return next(cloned);
  // const tg = inject(TelegramService);
  // return !environment.isTelegramMiniApp
  //   ? next(req.clone())
  //   : tg.initData$.pipe(
  //       switchMap((data) => {
  //         const cloned = req.clone({ headers: req.headers.append(headerName, data )});
  //         return next(cloned);
  //       })
  //     );
}
