import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Name = 'Name',
  Starts = 'Starts',
  Ends = 'Ends',
  Description = 'Description',
  NamePlaceholder = 'NamePlaceholder',
  DescriptionPlaceholder = 'DescriptionPlaceholder',
  SaveEvent = 'SaveEvent',
  HasBeenSaved = 'HasBeenSaved',
  SpecificDaysOfWeek = 'SpecificDaysOfWeek',
  DaysOfWeekPlaceholder = 'DaysOfWeekPlaceholder',
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
  SpecificDaysOfWeek: {
    en: 'Restrict by days of week',
    ru: 'Ограничить по дням недели',
  },
  DaysOfWeekPlaceholder: {
    en: 'Select days of week',
    ru: 'Выбрать дни недели',
  },
  SaveEvent: {
    en: 'Save event',
    ru: 'Сохранить событие',
  },
  HasBeenSaved: {
    en: 'All changes have been saved successfully',
    ru: 'Все изменения успешно сохранены',
  },
};