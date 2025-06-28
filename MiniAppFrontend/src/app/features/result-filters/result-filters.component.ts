import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCheckbox, IonRange } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';

@Component({
  selector: 'app-result-filters',
  templateUrl: './result-filters.component.html',
  styleUrls: ['./result-filters.component.scss'],
  imports: [
    SharedFeatureModule,
    IonCheckbox,
    IonRange,
    FormsModule,
  ],
})
export class ResultFiltersComponent  implements OnInit {

  public readonly maybe = signal<boolean>(true);
  public readonly time = signal<boolean>(true);
  public readonly membersCount = signal<number>(10);

  constructor() { }

  ngOnInit() {}

}
