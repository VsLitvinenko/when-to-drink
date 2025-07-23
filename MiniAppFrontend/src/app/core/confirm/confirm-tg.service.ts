import { Injectable } from '@angular/core';
import { ConfirmOptions, ConfirmService } from './confirm.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class TgConfirmService extends ConfirmService {

  constructor() { super(); }

  public createConfirm(options: ConfirmOptions): Observable<boolean> {
    return of(true);
  }
}
