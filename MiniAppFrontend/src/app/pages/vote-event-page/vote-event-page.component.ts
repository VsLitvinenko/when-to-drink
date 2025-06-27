import { Component, OnInit } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';

@Component({
  selector: 'app-vote-event-page',
  templateUrl: './vote-event-page.component.html',
  styleUrls: ['./vote-event-page.component.scss'],
  imports: [
    PageCommonModule,
    VoteCalendarComponent,
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
