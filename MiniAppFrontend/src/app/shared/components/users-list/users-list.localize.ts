import { LocalizationPreset } from '../../localize';

enum LocalizeEnum {
  Search = 'Search',
}

export const UsersListLocalize: LocalizationPreset<LocalizeEnum> = {
  Search: {
    en: 'Search',
    ru: 'Поиск',
  },
};
