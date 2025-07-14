import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  FilterResults = 'FilterResults',
  Exclude = 'Exclude',
  Maybe = 'Maybe',
  Time = 'Time',
  IgnorePastDates = 'IgnorePastDates',
  OnlyWithMe = 'OnlyWithMe',
  AtLeast = 'AtLeast',
  Member = 'Member',
}

export const ResultFiltersLocalize: LocalizationPreset<LocalizeEnum> = {
  FilterResults: {
    en: 'Filter results',
    ru: 'Фильтровать результаты',
  },
  Exclude: {
    en: 'Exclude',
    ru: 'Исключить ',
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
  OnlyWithMe: {
    en: 'Only with me',
    ru: 'Только со мной',
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