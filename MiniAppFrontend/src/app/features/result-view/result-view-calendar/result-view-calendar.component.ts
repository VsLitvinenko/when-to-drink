import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultViewDirective } from '../result-view.directive';
import { groupBy } from 'lodash';
import { VoteType } from '../../vote-calendar/models';
import { ResultDateInfoModalComponent } from '../components';
import { getColorByType, getIconByType } from '../helpers';
import { ResultViewCalendarPickerDirective } from './result-view-calendar-picker.directive';
import { ResultDate } from '../models';
import { LocalizeService } from 'src/app/shared/localize';

@Component({
  selector: 'app-result-view-calendar',
  templateUrl: './result-view-calendar.component.html',
  styleUrls: ['./result-view-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SharedFeatureModule,
    IonDatetime,
    ResultDateInfoModalComponent,
    ResultViewCalendarPickerDirective,
  ],
})
export class ResultViewCalendarComponent {
  private readonly ionDateComponent = viewChild(IonDatetime);
  private readonly data = inject(ResultViewDirective);

  public readonly getIconByType = getIconByType;
  public readonly getColorByType = getColorByType;

  public readonly selectedDate = signal<ResultDate | undefined>(undefined);

  private readonly localizeService = inject(LocalizeService);
  public readonly localizeFormat$ = this.localizeService.localizationWithFormat$;

  constructor() {
    effect(() => {
      const ionDate = this.ionDateComponent();
      const filteredDates = this.data.filteredDates();
      if (!ionDate) {
        return;
      } else if (filteredDates.length === 0) {
        ionDate.highlightedDates = [];
        return;
      } else {
        const grouped = groupBy(filteredDates, 'type');
        const ready = grouped[VoteType.Ready] ?? [];
        const maybe = grouped[VoteType.Maybe] ?? [];
        const time = grouped[VoteType.Time] ?? [];

        ionDate.highlightedDates = [
          ...ready.map((item) => ({
            date: this.data.formatVoteDate(item.date),
            textColor: 'var(--ready-text-color)',
            backgroundColor: 'var(--ready-bg-color)',
          })),
          ...maybe.map((item) => ({
            date: this.data.formatVoteDate(item.date),
            textColor: 'var(--maybe-text-color)',
            backgroundColor: 'var(--maybe-bg-color)',
          })),
          ...time.map((item) => ({
            date: this.data.formatVoteDate(item.date),
            textColor: 'var(--time-text-color)',
            backgroundColor: 'var(--time-bg-color)',
          })),
        ];
      }
    });
  }

}
