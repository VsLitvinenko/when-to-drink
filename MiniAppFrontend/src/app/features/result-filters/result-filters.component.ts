import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonCheckbox, IonRange } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultFiltersLocalize } from './result-filters.localize';

@Component({
  selector: 'app-result-filters',
  templateUrl: './result-filters.component.html',
  styleUrls: ['./result-filters.component.scss'],
  imports: [
    SharedFeatureModule,
    IonAccordionGroup,
    IonAccordion,
    IonCheckbox,
    IonRange,
    FormsModule,
  ],
})
export class ResultFiltersComponent  implements OnInit {

  public readonly maybe = signal<boolean>(true);
  public readonly time = signal<boolean>(true);
  public readonly trimPast = signal<boolean>(true);
  public readonly membersCount = signal<number>(6);

  public readonly ResultFiltersLocalize = ResultFiltersLocalize;

  constructor() { }

  ngOnInit() {}

}
