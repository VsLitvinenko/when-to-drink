import { Component, computed, ContentChild, input, output, signal, TemplateRef } from '@angular/core';
import { IonAvatar, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/angular/standalone';
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
    IonSearchbar,
  ],
})
export class UsersListComponent {
  public readonly users = input([...fakeUsers]);
  public readonly searchStr = signal<string | null | undefined>(null);

  public readonly filteredUsers = computed(() => {
    const users = this.users();
    const searchStr = this.searchStr()?.toLowerCase();
    return !searchStr
      ? users
      : users.filter((user) => {
          const userName = user.fullName.toLowerCase();
          return userName.includes(searchStr!);
        });
  });

  public readonly searchFocused = output<boolean>();
  @ContentChild('end', { static: true }) endTemplateRef?: TemplateRef<any>;
}
