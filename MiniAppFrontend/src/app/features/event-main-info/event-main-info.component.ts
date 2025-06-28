import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonList } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';

@Component({
  selector: 'app-event-main-info',
  templateUrl: './event-main-info.component.html',
  styleUrls: ['./event-main-info.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAccordionGroup,
    IonAccordion,
    IonAvatar,
    IonList,
  ],
})
export class EventMainInfoComponent  implements OnInit {
  public readonly now = new Date();

  constructor() { }

  ngOnInit() {}

}
