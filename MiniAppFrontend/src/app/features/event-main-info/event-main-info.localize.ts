import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Members = 'Members',
  Initiator = 'Initiator',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
}

export const EventMainInfoLocalize: LocalizationPreset<LocalizeEnum> = {
  Members: {
    en: 'member(s)',
    ru: 'участник(ов)',
  },
  Initiator: {
    en: 'Initiator',
    ru: 'Инициатор',
  },
  Starts: {
    en: 'Starts',
    ru: 'Начало',
  },
  Ends: {
    en: 'Ends',
    ru: 'Конец',
  },
  Description: {
    en: 'Description',
    ru: 'Описание',
  },
};