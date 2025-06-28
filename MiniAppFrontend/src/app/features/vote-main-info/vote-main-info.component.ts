import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonList } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';

@Component({
  selector: 'app-vote-main-info',
  templateUrl: './vote-main-info.component.html',
  styleUrls: ['./vote-main-info.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAccordionGroup,
    IonAccordion,
    IonAvatar,
    IonList,
  ],
})
export class VoteMainInfoComponent  implements OnInit {
  public readonly now = new Date();

  constructor() { }

  ngOnInit() {}

}
