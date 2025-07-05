import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Name = 'Name',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
  NamePlaceholder = 'NamePlaceholder',
  DescriptionPlaceholder = 'DescriptionPlaceholder',
  SaveChanges = 'SaveChanges',
  Link = 'Link',
  GoTo = 'GoTo',
  HasBeenSaved = 'HasBeenSaved',
  ClipboardLink = 'ClipboardLink',
}

export const EditEventFormLocalize: LocalizationPreset<LocalizeEnum> = {
  Name: {
    en: 'Event name',
    ru: 'Название',
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
  NamePlaceholder: {
    en: 'Enter name',
    ru: 'Введите название',
  },
  DescriptionPlaceholder: {
    en: 'Enter description',
    ru: 'Введите описание',
  },
  SaveChanges: {
    en: 'Save changes',
    ru: 'Сохранить изменения',
  },
  Link: {
    en: 'Link',
    ru: 'Ссылка',
  },
  GoTo: {
    en: 'Go to',
    ru: 'Перейти',
  },
  HasBeenSaved: {
    en: 'All changes have been saved successfully',
    ru: 'Все изменения успешно сохранены',
  },
  ClipboardLink: {
    en: 'Link to created event was copied to clipboard',
    ru: 'Ссылка на созданное событие скопирована в буфер обмена',
  },
};