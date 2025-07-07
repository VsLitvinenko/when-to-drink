import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  FilterResults = 'FilterResults',
  Consider = 'Consider',
  Maybe = 'Maybe',
  Time = 'Time',
  IgnorePastDates = 'IgnorePastDates',
  AtLeast = 'AtLeast',
  Members = 'Members',
}

export const ResultFiltersLocalize: LocalizationPreset<LocalizeEnum> = {
  FilterResults: {
    en: 'Filter results',
    ru: 'Фильтровать результаты',
  },
  Consider: {
    en: 'Consider',
    ru: 'Включить',
  },
  Maybe: {
    en: 'Maybe',
    ru: 'Возможно',
  },
  Time: {
    en: 'Time',
    ru: 'Время',
  },
  IgnorePastDates: {
    en: 'Ignore past dates',
    ru: 'Убрать прошедшие даты',
  },
  AtLeast: {
    en: 'At least',
    ru: 'Как минимум',
  },
  Members: {
    en: 'member(s)',
    ru: 'участник(ов)',
  },
};