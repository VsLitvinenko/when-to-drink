import { getIconByType, getColorByType } from './../helpers';
import { Component, inject, OnInit } from '@angular/core';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultViewDirective } from '../result-view.directive';
import { ResultDateInfoModalComponent } from '../components';

@Component({
  selector: 'app-result-view-list',
  templateUrl: './result-view-list.component.html',
  styleUrls: ['./result-view-list.component.scss'],
  imports: [
    SharedFeatureModule,
    ResultDateInfoModalComponent,
  ],
})
export class ResultViewListComponent  implements OnInit {
  private readonly data = inject(ResultViewDirective);
  public filteredDates = this.data.filteredDates;

  public readonly getIconByType = getIconByType;
  public readonly getColorByType = getColorByType;

  constructor() { }

  ngOnInit() {}

}
