import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Results = 'Results',
  Vote = 'Vote',
}

export const VotePageLocalize: LocalizationPreset<LocalizeEnum> = {
  Results: {
    en: 'Results',
    ru: 'Результаты',
  },
  Vote: {
    en: 'Vote',
    ru: 'Выбрать даты',
  }
};