import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  FilterResults = 'FilterResults',
  Consider = 'Consider',
  Maybe = 'Maybe',
  Time = 'Time',
  IgnorePastDates = 'IgnorePastDates',
  AtLeast = 'AtLeast',
  Member = 'Member',
}

export const ResultFiltersLocalize: LocalizationPreset<LocalizeEnum> = {
  FilterResults: {
    en: 'Filter results',
    ru: 'Фильтровать результаты',
  },
  Consider: {
    en: 'Consider',
    ru: 'Учитывать',
  },
  Maybe: {
    en: '"maybe"',
    ru: '"возможно"',
  },
  Time: {
    en: '"time"',
    ru: '"время"',
  },
  IgnorePastDates: {
    en: 'Ignore past dates',
    ru: 'Убрать прошедшие даты',
  },
  AtLeast: {
    en: 'At least',
    ru: 'Как минимум',
  },
  Member: {
    en: 'member',
    ru: 'участник',
  },
};