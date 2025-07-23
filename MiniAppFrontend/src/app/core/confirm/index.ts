import { makeEnvironmentProviders } from '@angular/core';
import { ConfirmService } from './confirm.service';
import { ConfirmTgService } from './confirm-tg.service';
import { ConfirmIonService } from './confirm-ion.service';


export const provideConfirmService = (useTelegramConfirm: boolean) => {
  return makeEnvironmentProviders([
    {
      provide: ConfirmService,
      useClass: useTelegramConfirm
        ? ConfirmTgService
        : ConfirmIonService,
    },
  ]);
}

export * from './confirm.service';