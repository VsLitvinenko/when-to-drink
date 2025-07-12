import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { SharedFeatureModule } from 'src/app/shared';
import { ViewPick } from '../models/view-pick.enum';

@Component({
  selector: 'app-result-view-picker-control',
  templateUrl: './result-view-picker-control.component.html',
  styleUrls: ['./result-view-picker-control.component.scss'],
  imports: [SharedFeatureModule],
})
export class ResultViewPickerControlComponent {
  @Input() disabled: boolean | null = false;

  public readonly ViewPick = ViewPick;
  public readonly value = signal(ViewPick.List);

  @Output() refresh = new EventEmitter();

  constructor() {}
}
