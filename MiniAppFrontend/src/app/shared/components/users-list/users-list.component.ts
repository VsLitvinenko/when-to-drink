import { Component, computed, ContentChild, input, output, signal, TemplateRef } from '@angular/core';
import { IonAvatar, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { fakeUsers } from '../../../core/mock-data';
import { LocalizePipe } from '../../localize';
import { UsersListLocalize } from './users-list.localize';

export interface UserItem {
  photoUrl: string;
  fullName: string;
}

export interface UserClickedEvent<TUser extends UserItem> {
  index: number;
  user: TUser;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [
    CommonModule,
    LocalizePipe,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonSearchbar,
  ],
})
export class UsersListComponent<TUser extends UserItem> {
  
  public readonly clickable = input(false);

  public readonly users = input<TUser[]>([...fakeUsers] as any);
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
  public readonly userClicked = output<UserClickedEvent<TUser>>();

  @ContentChild('end', { static: true }) endTemplateRef?: TemplateRef<any>;

  public readonly UsersListLocalize = UsersListLocalize;

  public onUserClicked(index: number, user: TUser): void {
    if (this.clickable()) {
      this.userClicked.emit({ index, user: {...user} });
    }
  }
}
