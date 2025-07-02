import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  FilterResults = 'FilterResults',
  Consider = 'Consider',
  Maybe = 'Maybe',
  Time = 'Time',
  IgnorePastDates = 'IgnorePastDates',
  ThresholdMembersCount = 'ThresholdMembersCount',
  Members = 'Members',
}

export const ResultFiltersLocalize: LocalizationPreset<LocalizeEnum> = {
  FilterResults: {
    en: 'Filter results',
    ru: 'Фильтровать результаты',
  },
  Consider: {
    en: 'Consider',
    ru: 'Исключить',
  },
  Maybe: {
    en: 'Maybe',
    ru: 'возможно',
  },
  Time: {
    en: 'Time',
    ru: 'время',
  },
  IgnorePastDates: {
    en: 'Ignore past dates',
    ru: 'Убрать прошедшие даты',
  },
  ThresholdMembersCount: {
    en: 'Minimum members',
    ru: 'Минимум участников',
  },
  Members: {
    en: 'member(s)',
    ru: 'участник(ов)',
  },
};