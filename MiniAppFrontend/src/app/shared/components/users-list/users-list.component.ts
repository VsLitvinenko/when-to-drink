import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { IonAvatar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { fakeUsers } from '../fake-users';


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
    CommonModule,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
  ],
})
export class UsersListComponent {
  @Input() users: UserItem[] = fakeUsers;
  @ContentChild('end', { static: true }) endTemplateRef?: TemplateRef<any>;
}
