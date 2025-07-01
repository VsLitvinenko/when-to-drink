import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultViewDirective } from '../result-view.directive';
import { groupBy } from 'lodash';
import { VoteType } from '../../vote-calendar/models';
import { format } from 'date-fns';
import { ResultDateInfoModalComponent } from '../components';
import { getColorByType, getIconByType } from '../helpers';

const formatVoteDate = (date: Date) => format(date, 'yyyy-MM-dd');

@Component({
  selector: 'app-result-view-calendar',
  templateUrl: './result-view-calendar.component.html',
  styleUrls: ['./result-view-calendar.component.scss'],
  imports: [
    SharedFeatureModule,
    IonDatetime,
    ResultDateInfoModalComponent,
  ],
})
export class ResultViewCalendarComponent {
  private readonly ionDateComponent = viewChild(IonDatetime);
  private readonly data = inject(ResultViewDirective);

  public readonly getIconByType = getIconByType;
  public readonly getColorByType = getColorByType;

  public readonly selectedDate = computed(() => this.data.filteredDates()[0])

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
            date: formatVoteDate(item.date),
            textColor: 'rgba(77, 141, 255, 1)',
            backgroundColor: 'rgba(77, 141, 255, 0.2)',
          })),
          ...maybe.map((item) => ({
            date: formatVoteDate(item.date),
            textColor: 'rgba(255, 206, 49, 1)',
            backgroundColor: 'rgba(255, 206, 49, 0.16)',
          })),
          ...time.map((item) => ({
            date: formatVoteDate(item.date),
            textColor: 'rgba(45, 213, 91, 1)',
            backgroundColor: 'rgba(45, 213, 91, 0.16)',
          })),
        ];
      }
    });
  }

}
