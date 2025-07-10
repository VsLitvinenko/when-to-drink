import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Member = 'Member',
  NoData = 'NoData',
}

export const ResultViewLocalize: LocalizationPreset<LocalizeEnum> = {
  Member: {
    en: 'member',
    ru: 'участник',
  },
  NoData: {
    en: 'No data, try to change filters',
    ru: 'Пусто, попробуйте другие фильтры',
  },
};