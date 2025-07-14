import { Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonCheckbox, IonRange } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultFiltersLocalize } from './result-filters.localize';
import { isNil } from 'lodash';

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
  @Input() disabled: boolean | null = false;
  @Input({ required: true }) maxMembers!: number;
  @Input() set maxOverlap(n: number | null | undefined) {
    if (!isNil(n)) {
      this.membersCount.set(n);
    }
  } 

  public readonly noMaybe = signal<boolean>(false);
  public readonly noTime = signal<boolean>(false);
  public readonly onlyWithMe = signal<boolean>(false);
  public readonly trimPast = signal<boolean>(true);
  public readonly membersCount = signal<number>(1);

  public readonly ResultFiltersLocalize = ResultFiltersLocalize;

  constructor() { }

  ngOnInit() {}

}
