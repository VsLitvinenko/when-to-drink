import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { SharedFeatureModule } from '../../shared-feature.module';
import { IonAvatar } from '@ionic/angular/standalone';
import { fakeUsers } from './fake-users';


export interface UserItem {
  imgSrc: string;
  fullName: string;
  [key: string]: any;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAvatar,
  ],
})
export class UsersListComponent {
  @Input() users: UserItem[] = fakeUsers;
  @ContentChild('end', { static: true }) endTemplateRef?: TemplateRef<any>;
}
