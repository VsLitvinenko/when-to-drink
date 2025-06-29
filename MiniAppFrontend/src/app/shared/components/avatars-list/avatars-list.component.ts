import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IonAvatar } from '@ionic/angular/standalone';
import { avatars } from '../fake-users';

@Component({
  selector: 'app-avatars-list',
  templateUrl: './avatars-list.component.html',
  styleUrls: ['./avatars-list.component.scss'],
  imports: [
    CommonModule,
    IonAvatar,
  ],
})
export class AvatarsListComponent {
  public readonly imgs = input(avatars);
  public readonly maxCount = input(8);

  public readonly sliced = computed(() => this.imgs().slice(0, this.maxCount()));
}
