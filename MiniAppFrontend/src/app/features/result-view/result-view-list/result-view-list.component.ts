import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SharedFeatureModule } from 'src/app/shared';
import { ResultViewDirective } from '../result-view.directive';
import { ResultDateInfoModalComponent } from '../components';
import { ResultViewLocalize } from '../result-view.localize';
import { ResultViewHelpers } from '../models';

@Component({
  selector: 'app-result-view-list',
  templateUrl: './result-view-list.component.html',
  styleUrls: ['./result-view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SharedFeatureModule,
    ResultDateInfoModalComponent,
  ],
})
export class ResultViewListComponent  implements OnInit {
  private readonly data = inject(ResultViewDirective);
  public filteredDates = this.data.filteredDates;

  public readonly Helpers = ResultViewHelpers;
  public ResultViewLocalize = ResultViewLocalize;

  constructor() { }

  ngOnInit() {}

}
