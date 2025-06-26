import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonChip } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';

@Component({
  selector: 'app-vote-calendar',
  templateUrl: './vote-calendar.component.html',
  styleUrls: ['./vote-calendar.component.scss'],
  imports: [
    SharedFeatureModule,
    IonDatetime,
    IonChip,
  ]
})
export class VoteCalendarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
