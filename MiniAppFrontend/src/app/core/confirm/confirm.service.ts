import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizeService } from 'src/app/shared/localize';
import { ConfirmLocalize } from './confirm.localize';

export interface ConfirmOptions {
  header: string;
  message: string;
  cancelText?: string;
  okText?: string;
  okDanger?: boolean;
}

@Injectable()
export abstract class ConfirmService {
  private readonly local = inject(LocalizeService);
  protected readonly cancelText = this.local.localizeSync(ConfirmLocalize.Cancel);

  public abstract createConfirm(options: ConfirmOptions): Observable<boolean>;
}