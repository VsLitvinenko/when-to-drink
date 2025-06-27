import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButton, IonLabel, IonIcon, IonButtons } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
  ],
  exports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
  ],
})
export class SharedFeatureModule {}
