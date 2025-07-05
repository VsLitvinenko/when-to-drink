import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Link = 'Link',
  GoTo = 'GoTo',
  ClipboardLink = 'ClipboardLink',
}

export const EditEventPageLocalize: LocalizationPreset<LocalizeEnum> = {
  Link: {
    en: 'Link',
    ru: 'Ссылка',
  },
  GoTo: {
    en: 'Go to',
    ru: 'Перейти',
  },
  ClipboardLink: {
    en: 'Link to created event was copied to clipboard',
    ru: 'Ссылка на созданное событие скопирована в буфер обмена',
  },
};