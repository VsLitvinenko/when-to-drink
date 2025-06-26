import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonChip, IonPopover } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { IonDateSpecifyDirective } from './directives';

@Component({
  selector: 'app-vote-calendar',
  templateUrl: './vote-calendar.component.html',
  styleUrls: ['./vote-calendar.component.scss'],
  imports: [
    SharedFeatureModule,
    IonDateSpecifyDirective,
    IonDatetime,
    IonChip,
    IonPopover,
  ]
})
export class VoteCalendarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
