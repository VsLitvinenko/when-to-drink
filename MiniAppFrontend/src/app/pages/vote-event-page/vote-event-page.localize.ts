import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Results = 'Results',
  Vote = 'Vote',
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
  LeaveQuestion: {
    en: 'Leave this page?',
    ru: 'Покинуть эту страницу?',
  },
  LoseUnsaved: {
    en: 'You have unsaved changes',
    ru: 'Есть несохраненные изменения',
  },
};