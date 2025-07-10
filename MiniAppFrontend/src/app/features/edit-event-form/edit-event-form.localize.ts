import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Name = 'Name',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
  NamePlaceholder = 'NamePlaceholder',
  DescriptionPlaceholder = 'DescriptionPlaceholder',
  CreateEvent = 'CreateEvent',
  UpdateEvent = 'UpdateEvent',
  HasBeenSaved = 'HasBeenSaved',
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
  CreateEvent: {
    en: 'Create event',
    ru: 'Создать событие',
  },
  UpdateEvent: {
    en: 'Update event',
    ru: 'Обновить событие',
  },
  HasBeenSaved: {
    en: 'All changes have been saved successfully',
    ru: 'Все изменения успешно сохранены',
  },
};