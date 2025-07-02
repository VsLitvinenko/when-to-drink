import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  Ready = 'Ready',
  Maybe = 'Maybe',
  Time = 'Time',
  HoldDate = 'HoldDate',
  RightClickDate = 'RightClickDate',
  SelectSpecificStatus = 'SelectSpecificStatus',
  DoNotForgetSave = 'DoNotForgetSave',
  Clear = 'Clear',
  Reset = 'Reset',
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
  HoldDate: {
    en: 'Hold date',
    ru: 'Удерживайте дату,',
  },
  RightClickDate: {
    en: 'Right click on date',
    ru: 'Нажмите правой кнопкой мыши по дате,',
  },
  SelectSpecificStatus: {
    en: 'to select specific status',
    ru: 'чтобы выбрать статус'
  },
  DoNotForgetSave: {
    en: "Don't forget to save changes",
    ru: 'Не забудьте сохранить изменения',
  },
  Clear: {
    en: 'Clear',
    ru: 'Очистить',
  },
  Reset: {
    en: 'Reset',
    ru: 'Сброс',
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