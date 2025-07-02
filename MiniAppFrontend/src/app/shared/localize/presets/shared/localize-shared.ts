import { LocalizationPreset } from '../../localize.model';

enum SharedEnum {
  Search = 'Search',
}

export const LocalizeShared: LocalizationPreset<SharedEnum> = {
  Search: {
    en: 'Search',
    ru: 'Поиск',
  },
};