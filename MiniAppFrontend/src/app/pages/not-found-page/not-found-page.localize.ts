import { LocalizationPreset } from '../../shared/localize';

enum LocalizeEnum {
  WeCantFind = 'WeCantFind',
  MaybeYouWant = 'MaybeYouWant',
  CreateNew = 'CreateNew',
}

export const NotFoundPageLocalize: LocalizationPreset<LocalizeEnum> = {
  WeCantFind: {
    en: 'We could not find what you are looking for',
    ru: 'Мы не смогли найти то, что вы искали',
  },
  MaybeYouWant: {
    en: 'Although, maybe you will want to',
    ru: 'Хотя, возможно, вы захотите',
  },
  CreateNew: {
    en: 'Create new event',
    ru: 'Создать новое событие',
  },
};