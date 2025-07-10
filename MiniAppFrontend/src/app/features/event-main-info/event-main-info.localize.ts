import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Member = 'Member',
  Initiator = 'Initiator',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
  Share = 'Share',
  Link = 'Link',
  Edit = 'Edit',
  Delete = 'Delete',
  ClipboardLink = 'ClipboardLink',
  EventWasDeleted = 'EventWasDeleted',
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
  Description: {
    en: 'Description',
    ru: 'Описание',
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
};