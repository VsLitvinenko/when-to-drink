import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButton, IonLabel, IonIcon, IonButtons, IonItem, IonNote } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonNote,
  ],
  exports: [
    CommonModule,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonNote,
  ],
})
export class SharedFeatureModule {}
