import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { AvatarsListComponent, UsersListComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-event-main-info',
  templateUrl: './event-main-info.component.html',
  styleUrls: ['./event-main-info.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAccordionGroup,
    IonAccordion,
    IonAvatar,
    IonModal,
    AvatarsListComponent,
    UsersListComponent,
  ],
})
export class EventMainInfoComponent  implements OnInit {
  public readonly now = new Date();

  constructor() { }

  ngOnInit() {}

}
