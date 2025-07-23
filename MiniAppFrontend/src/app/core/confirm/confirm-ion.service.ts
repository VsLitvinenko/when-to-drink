import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import { ConfirmOptions, ConfirmService } from './confirm.service';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class ConfirmIonService extends ConfirmService {
  private readonly alert = inject(AlertController);

  constructor() { super(); }

  public createConfirm(options: ConfirmOptions): Observable<boolean> {
    const res$ = new Subject<boolean>();
    this.alert.create({
      mode: 'ios',
      header: options.header,
      message: options.message,
      backdropDismiss: false,
      buttons: [
        {
          text: options.cancelText ?? this.cancelText,
          role: 'cancel',
          handler: () => {
            res$.next(false);
            res$.complete();
          },
        },
        {
          text: options.okText ?? 'OK',
          role: options.okDanger ? 'destructive' : undefined,
          handler: () => {
            res$.next(true);
            res$.complete();
          },
        },
      ],
    }).then((ref) => ref.present());
    return res$.asObservable();
  }
}
