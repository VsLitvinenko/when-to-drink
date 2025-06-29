import { Component, viewChild } from '@angular/core';
import { IonChip, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { UsersListComponent } from 'src/app/shared/components';
import { ResultDate } from '../../models';
import { getColorByType, getIconByType } from '../../helpers';

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

  public readonly getIconByType = getIconByType;
  public readonly getColorByType = getColorByType;

  public present(resultDate: ResultDate): void {
    const modal = this.ionModal();
    if (!modal) { return; }
    this.resultDate = resultDate;
    modal.present();
  }
}
