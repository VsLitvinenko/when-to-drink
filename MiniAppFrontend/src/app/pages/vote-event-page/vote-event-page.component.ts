import { Component, computed, OnInit, viewChild } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { EventMainInfoComponent } from 'src/app/features/event-main-info';
import { ResultFiltersComponent } from 'src/app/features/result-filters';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';
import { ResultViewPickerComponent, ViewPick } from '../../features/result-view-picker';
import { ResultViewCalendarComponent, ResultViewDirective, ResultViewListComponent } from 'src/app/features/result-view';
import { VotePageLocalize } from './vote-event-page.localize';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

const timing = '0.4s ease-in-out';
const visible = { transform: 'translateX(0)' };
const leaveEnd = { transform: `translateX({{ leaveEnd }}%)` };
const enterStart = { transform: `translateX({{ enterStart }}%)` };

@Component({
  selector: 'app-vote-event-page',
  templateUrl: './vote-event-page.component.html',
  styleUrls: ['./vote-event-page.component.scss'],
  imports: [
    PageCommonModule,
    VoteCalendarComponent,
    EventMainInfoComponent,
    ResultFiltersComponent,
    ResultViewPickerComponent,
    ResultViewListComponent,
    ResultViewCalendarComponent,
    ResultViewDirective,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
  ],
  host: {
    class: 'app-page-inner',
  },
  animations: [
    trigger('openCloseResultView', [
      transition('* => *',
        [
          group([
            query(':enter', style(enterStart)),
            query(':leave', [animate(timing, style(leaveEnd))], { optional: true }),
            query(':enter', [animate(timing), style(visible)]),
          ])
        ],
        { params: { leaveEnd: -120, enterStart: 120, } }
      ),
    ]),
  ],
})
export class VoteEventPageComponent  implements OnInit {
  public readonly ViewPick = ViewPick;
  public readonly VotePageLocalize = VotePageLocalize;

  private readonly viewPicker = viewChild<ResultViewPickerComponent>('viewPicker');
  public readonly animationParams = computed(() => {
    switch (this.viewPicker()?.value()) {
      case ViewPick.List:
        return { leaveEnd: 120, enterStart: -120 };
      case ViewPick.Calendar:
        return { leaveEnd: -120, enterStart: 120 };
      default:
        return {};
    }
  });

  constructor() { }

  ngOnInit() {}

}
