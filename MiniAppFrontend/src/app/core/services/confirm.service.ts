import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import { Observable, Subject } from 'rxjs';

export interface ConfirmOptions {
  header: string;
  message: string;
  cancelText?: string;
  okText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private readonly alert = inject(AlertController);

  constructor() { }

  public createConfirm(options: ConfirmOptions): Observable<boolean> {
    const res$ = new Subject<boolean>();
    this.alert.create({
      mode: 'ios',
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: options.cancelText ?? 'Cancel',
          handler: () => {
            res$.next(false);
            res$.complete();
          },
        },
        {
          text: options.okText ?? 'OK',
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
