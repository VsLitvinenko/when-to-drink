import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ConfirmOptions {
  header: string;
  message?: string;
  cancelText?: string;
  okText?: string;
}

@Injectable()
export abstract class ConfirmService {
  public abstract createConfirm(options: ConfirmOptions): Observable<boolean>;
}