import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  NotAuthorized = 'NotAuthorized',
  TokenExpired = 'TokenExpired',
  TryToRelaunch = 'TryToRelaunch',
}

export const NotPermittedPageLocalize: LocalizationPreset<LocalizeEnum> = {
  NotAuthorized: {
    en: 'You are not authorized',
    ru: 'Вы не авторизованы',
  },
  TokenExpired: {
    en: 'Your token may have expired',
    ru: 'Возможно, срок действия вашего токена истек',
  },
  TryToRelaunch: {
    en: 'Try to relaunch this mini-app',
    ru: 'Попробуйте перезапустить мини-приложение',
  },
};