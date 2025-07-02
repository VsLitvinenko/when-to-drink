export enum Localization { en = 'en', ru = 'ru', }
export const LocalizationSet = new Set(Object.values(Localization));

export type LocalizationKey = (keyof typeof Localization);
export type LocalizationPresetLeaf = Record<LocalizationKey, string>;

export type LocalizationPreset<T extends string = string> = {
  [K in T]: LocalizationPreset<T> | LocalizationPresetLeaf;
};

export const isLocalizationLeaf = (val: any): val is LocalizationPresetLeaf => Boolean(val.en);