import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SharedFeatureModule } from 'src/app/shared';


export enum ViewPick {
  List = 'list',
  Calendar = 'calendar',
}

@Component({
  selector: 'app-result-view-picker',
  templateUrl: './result-view-picker.component.html',
  styleUrls: ['./result-view-picker.component.scss'],
  imports: [SharedFeatureModule],
})
export class ResultViewPickerComponent {
  public readonly ViewPick = ViewPick;
  public readonly value = signal(ViewPick.List);

  @Output() refresh = new EventEmitter();

  constructor() {}
}
