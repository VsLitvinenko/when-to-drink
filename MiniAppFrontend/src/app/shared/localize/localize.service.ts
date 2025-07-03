import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { TelegramService } from 'src/app/core/services';
import { Localization, LocalizationPresetLeaf, LocalizationSet } from './localize.model';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {
  // private readonly browserLocalization = 'en';
  private readonly browserLocalization = navigator.language.split('-')[0];
  private readonly tg = inject(TelegramService);

  public readonly localization$ = this.tg.languageCode$.pipe(
    map((local) => LocalizationSet.has(local) ? (local as Localization) : Localization.en),
    startWith((this.browserLocalization as Localization) ?? Localization.en),
    shareReplay(1)
  );

  public readonly localizationWithFormat$ = this.localization$.pipe(
    map((local) => `${local.toLowerCase()}-${local.toUpperCase()}`),
    shareReplay(1)
  );

  public readonly localizeLongDateFormat$ = this.localization$.pipe(
    map((localize) => {
      let dateFormat: string;
      switch (localize) {
        case Localization.en:
          dateFormat = 'MMMM d, yyyy';
          break;
        case Localization.ru:
          dateFormat = 'd MMMM, yyyy';
          break;
        default:
          dateFormat = 'MMMM d, yyyy';
          break;
      }
      return { localize, dateFormat };
    }),
    shareReplay(1),
  );

  public localize(value: LocalizationPresetLeaf): Observable<string> {
    return this.localization$.pipe(map((localization) => value[localization] ?? value.en));
  }
}
