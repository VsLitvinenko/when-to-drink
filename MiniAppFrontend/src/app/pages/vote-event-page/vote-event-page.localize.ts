import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Results = 'Results',
  Vote = 'Vote',
  EventEnded = 'EventEnded',
  LeaveQuestion = 'LeaveQuestion',
  LoseUnsaved = 'LoseUnsaved',
}

export const VotePageLocalize: LocalizationPreset<LocalizeEnum> = {
  Results: {
    en: 'Results',
    ru: 'Результаты',
  },
  Vote: {
    en: 'Vote',
    ru: 'Выбрать даты',
  },
  EventEnded: {
    en: 'This event has already ended',
    ru: 'Это событие уже завершилось',
  },
  LeaveQuestion: {
    en: 'Leave this page?',
    ru: 'Покинуть эту страницу?',
  },
  LoseUnsaved: {
    en: 'You have unsaved changes',
    ru: 'Есть несохраненные изменения',
  },
};