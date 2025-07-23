import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Cancel = 'Cancel',
}

export const ConfirmLocalize: LocalizationPreset<LocalizeEnum> = {
  Cancel: {
    en: 'Cancel',
    ru: 'Отмена',
  },
};