import { Component, computed, ContentChild, input, output, signal, TemplateRef } from '@angular/core';
import { IonAvatar, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { fakeUsers } from '../../../core/mock-data';
import { LocalizeShared } from '../../localize/presets/shared';
import { LocalizePipe } from '../../localize';

export interface UserItem {
  imgSrc: string;
  fullName: string;
}

export interface UserClickedEvent {
  index: number;
  user: UserItem;
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
export class UsersListComponent {
  public readonly clickable = input(false);
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
  public readonly userClicked = output<UserClickedEvent>();
  @ContentChild('end', { static: true }) endTemplateRef?: TemplateRef<any>;

  public readonly LocalizeShared = LocalizeShared;

  public onUserClicked(index: number, user: UserItem): void {
    if (this.clickable()) {
      this.userClicked.emit({ index, user: {...user} });
    }
  }
}
