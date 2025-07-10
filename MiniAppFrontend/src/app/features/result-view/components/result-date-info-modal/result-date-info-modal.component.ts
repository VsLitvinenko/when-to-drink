import { Component, inject, viewChild } from '@angular/core';
import { IonChip, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { UsersListComponent } from 'src/app/shared/components';
import { ResultDate, ResultUser, ResultViewHelpers } from '../../models';
import { LocalizeService } from 'src/app/shared/localize';
import { ResultViewLocalize } from '../../result-view.localize';

@Component({
  selector: 'app-result-date-info-modal',
  templateUrl: './result-date-info-modal.component.html',
  styleUrls: ['./result-date-info-modal.component.scss'],
  imports: [
    SharedFeatureModule,
    UsersListComponent,
    IonModal,
    IonChip,
  ]
})
export class ResultDateInfoModalComponent {
  private readonly ionModal = viewChild(IonModal);
  public resultDate?: ResultDate;
  public timeModeIndexes = new Set<number>();
  public readonly Helpers = ResultViewHelpers;

  private readonly localizeService = inject(LocalizeService);
  public readonly ResultViewLocalize = ResultViewLocalize;
  public readonly dateFormat$ = this.localizeService.localizeLongDateFormat$;

  public present(resultDate: ResultDate): void {
    const modal = this.ionModal();
    if (!modal) { return; }
    this.resultDate = resultDate;
    resultDate.users = resultDate.users
      .map((user, index) => ({ ...user, index}));
    modal.present();
  }

  public clearData(): void {
    this.resultDate = undefined;
    this.timeModeIndexes = new Set<number>();
  }

  public toggleUserMode(user: ResultUser): void {
    const index = (user as any).index;
    if (this.timeModeIndexes.has(index)) {
      this.timeModeIndexes.delete(index);
    } else {
      this.timeModeIndexes.add(index);
    }
  }
}
