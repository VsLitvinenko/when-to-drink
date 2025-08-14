import { LocalizationPreset } from '../../localize';

enum LocalizeEnum {
  ScrollTop = 'ScrollTop',
}

export const ScrollTopButtonLocalize: LocalizationPreset<LocalizeEnum> = {
  ScrollTop: {
    en: 'Scroll to top',
    ru: 'Вернуться наверх',
  },
};
