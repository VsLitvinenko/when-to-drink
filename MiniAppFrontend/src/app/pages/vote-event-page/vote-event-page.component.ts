import { Component, OnInit } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { EventMainInfoComponent } from 'src/app/features/event-main-info';
import { ResultFiltersComponent } from 'src/app/features/result-filters';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';
import { ResultViewPickerComponent, ViewPick } from '../../features/result-view-picker';
import { ResultViewCalendarComponent, ResultViewDirective, ResultViewListComponent } from 'src/app/features/result-view';
import { VotePageLocalize } from './vote-event-page.localize';

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
})
export class VoteEventPageComponent  implements OnInit {
  public readonly ViewPick = ViewPick;
  public readonly VotePageLocalize = VotePageLocalize;

  constructor() { }

  ngOnInit() {}

}
