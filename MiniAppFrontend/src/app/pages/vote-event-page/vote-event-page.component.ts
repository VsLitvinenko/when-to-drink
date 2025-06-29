import { Component, OnInit } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { EventMainInfoComponent } from 'src/app/features/event-main-info';
import { ResultFiltersComponent } from 'src/app/features/result-filters';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';
import { ResultViewPickerComponent } from '../../features/result-view-picker';

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
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
],
})
export class VoteEventPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
