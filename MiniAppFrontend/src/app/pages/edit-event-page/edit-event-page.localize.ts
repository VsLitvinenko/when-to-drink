import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  CreateEvent = 'CreateEvent',
  EditEvent = 'EditEvent',
  Link = 'Link',
  Share = 'Share',
  GoTo = 'GoTo',
  ClipboardLink = 'ClipboardLink',
  LeaveQuestion = 'LeaveQuestion',
  LoseUnsaved = 'LoseUnsaved',
}

export const EditEventPageLocalize: LocalizationPreset<LocalizeEnum> = {
  CreateEvent: {
    en: 'Create event',
    ru: 'Создать событие',
  },
  EditEvent: {
    en: 'Edit event',
    ru: 'Изменить событие',
  },
  Link: {
    en: 'Link',
    ru: 'Ссылка',
  },
  Share: {
    en: 'Share',
    ru: 'Поделиться',
  },
  GoTo: {
    en: 'Go to',
    ru: 'Перейти',
  },
  ClipboardLink: {
    en: 'Link to event was copied to clipboard',
    ru: 'Ссылка на событие скопирована в буфер обмена',
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