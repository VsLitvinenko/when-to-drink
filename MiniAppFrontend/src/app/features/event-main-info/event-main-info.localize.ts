import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Members = 'Members',
  Initiator = 'Initiator',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
  Share = 'Share',
  Link = 'Link',
  Edit = 'Edit',
  ClipboardLink = 'ClipboardLink',
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
  ClipboardLink: {
    en: 'Link was copied to clipboard',
    ru: 'Ссылка скопирована в буфер обмена',
  },
};