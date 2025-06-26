import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButton, IonLabel, IonIcon } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonIcon,
  ],
  exports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class SharedFeatureModule {}
