import { inject, Injectable } from '@angular/core';
import { ConfirmOptions, ConfirmService } from './confirm.service';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { TelegramService } from '../services';

@Injectable()
export class ConfirmTgService extends ConfirmService {
  private readonly tg = inject(TelegramService);

  constructor() { super(); }

  public createConfirm(options: ConfirmOptions): Observable<boolean> {
    const res$ = new Subject<boolean>();
    return this.tg.miniApp$.pipe(
      tap((miniApp) => {
        if (!miniApp) {
          res$.next(false);
          res$.complete();
          return;
        }
        const params = {
          title: options.header,
          message: options.message,
          buttons: [
            {
              id: 'ok',
              text: options.okText ?? 'OK',
              type: options.okDanger ? 'destructive' : 'default',
            },
            {
              id: 'cancel',
              text: options.cancelText,
              type: options.cancelText ? 'default' : 'cancel',
            },
          ],
        };
        miniApp.showPopup(params, (id: string) => {
          res$.next(id === 'ok');
          res$.complete();
        });
      }),
      switchMap(() => res$.asObservable()),
    );
  }
}
