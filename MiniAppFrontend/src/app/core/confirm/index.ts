import { makeEnvironmentProviders } from '@angular/core';
import { IonConfirmService } from './confirm-ion.service';
import { TgConfirmService } from './confirm-tg.service';
import { ConfirmService } from './confirm.service';


export const provideConfirmService = (useTelegramConfirm: boolean) => {
  return makeEnvironmentProviders([
    {
      provide: ConfirmService,
      useClass: useTelegramConfirm ? TgConfirmService : IonConfirmService,
    },
  ]);
}

export * from './confirm.service';