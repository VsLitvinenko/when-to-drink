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
};