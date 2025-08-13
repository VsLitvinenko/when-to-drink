import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Member = 'Member',
  Initiator = 'Initiator',
  Starts = 'Starts',
  Ends = 'Ends',
  DaysOfWeek = 'DaysOfWeek',
  Description = 'Description',
  Refresh = 'Refresh',
  Share = 'Share',
  Link = 'Link',
  Edit = 'Edit',
  Delete = 'Delete',
  ClipboardLink = 'ClipboardLink',
  EventWasDeleted = 'EventWasDeleted',
  DeleteQuestion = 'DeleteQuestion',
  CannotBeUndone = 'CannotBeUndone',
}

export const EventMainInfoLocalize: LocalizationPreset<LocalizeEnum> = {
  Member: {
    en: 'member',
    ru: 'участник',
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
  DaysOfWeek: {
    en: 'Days of week',
    ru: 'Дни недели',
  },
  Description: {
    en: 'Description',
    ru: 'Описание',
  },
  Refresh: {
    en: 'Refresh',
    ru: 'Обновить',
  },
  Share: {
    en: 'Share',
    ru: 'Поделиться',
  },
  Link: {
    en: 'Link',
    ru: 'Ссылка',
  },
  Edit: {
    en: 'Edit',
    ru: 'Изменить',
  },
  Delete: {
    en: 'Delete',
    ru: 'Удалить',
  },
  ClipboardLink: {
    en: 'Link was copied to clipboard',
    ru: 'Ссылка скопирована в буфер обмена',
  },
  EventWasDeleted: {
    en: 'Event was successfully deleted',
    ru: 'Событие было успешно удалено',
  },
  DeleteQuestion: {
    en: 'Delete event?',
    ru: 'Удалить событие?',
  },
  CannotBeUndone: {
    en: 'This cannot be undone',
    ru: 'Это нельзя отменить',
  },
};