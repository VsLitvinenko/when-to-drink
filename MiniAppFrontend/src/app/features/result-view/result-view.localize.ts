import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Members = 'Members',
  NoData = 'NoData',
}

export const ResultViewLocalize: LocalizationPreset<LocalizeEnum> = {
  Members: {
    en: 'member(s)',
    ru: 'участник(ов)',
  },
  NoData: {
    en: 'No data, try to change filters',
    ru: 'Пусто, попробуйте другие фильтры',
  },
};