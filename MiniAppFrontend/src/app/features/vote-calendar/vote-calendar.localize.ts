import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Ready = 'Ready',
  Maybe = 'Maybe',
  Time = 'Time',
  ToggleStatus = 'ToggleStatus',
  Or = 'Or',
  HoldDate = 'HoldDate',
  RightClickDate = 'RightClickDate',
  SelectSpecificStatus = 'SelectSpecificStatus',
  // DoNotForgetSave = 'DoNotForgetSave',
  Clear = 'Clear',
  Cancel = 'Cancel',
  Save = 'Save',
  StartTime = 'StartTime',
  EndTime = 'EndTime',
  SpecifyTime = 'SpecifyTime',
  HasBeenSaved = 'HasBeenSaved',
}

export const VoteCalendarLocalize: LocalizationPreset<LocalizeEnum> = {
  Ready: {
    en: 'Ready',
    ru: 'Готов',
  },
  Maybe: {
    en: 'Maybe',
    ru: 'Возможно',
  },
  Time: {
    en: 'Time',
    ru: 'Время',
  },
  ToggleStatus: {
    en: 'Toggle default status',
    ru: 'Переключайте статус по-умолчанию',
  },
  Or: {
    en: 'Or',
    ru: 'Или',
  },
  HoldDate: {
    en: 'hold date',
    ru: 'удерживайте дату',
  },
  RightClickDate: {
    en: 'right click on date',
    ru: 'нажмите правой кнопкой мыши по дате',
  },
  SelectSpecificStatus: {
    en: 'to select specific one',
    ru: 'для точного выбора'
  },
  // DoNotForgetSave: {
  //   en: "Don't forget to save changes",
  //   ru: 'Не забудьте сохранить изменения',
  // },
  Clear: {
    en: 'Clear',
    ru: 'Очистить',
  },
  Cancel: {
    en: 'Cancel',
    ru: 'Отмена',
  },
  Save: {
    en: 'Save',
    ru: 'Готово',
  },
  StartTime: {
    en: 'Start time',
    ru: 'Время начала',
  },
  EndTime: {
    en: 'End time',
    ru: 'Время окончания',
  },
  SpecifyTime: {
    en: 'Specify time',
    ru: 'Указать время',
  },
  HasBeenSaved: {
    en: 'All changes have been saved successfully',
    ru: 'Все изменения успешно сохранены',
  },
};