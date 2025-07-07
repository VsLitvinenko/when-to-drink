import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export function apiUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const url = `${environment.apiUrl}/${req.url}`;
  const cloned = req.clone({ url });
  return next(cloned);
}
