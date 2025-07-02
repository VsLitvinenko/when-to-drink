export enum Localization { en = 'en', ru = 'ru', }
export const LocalizationSet = new Set(Object.values(Localization));

export type LocalizationKey = (keyof typeof Localization);
export type LocalizationPresetLeaf = Record<LocalizationKey, string>;

export type LocalizationPreset<T extends string = string> = {
  [K in T]: LocalizationPresetLeaf;
};