import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButton, IonLabel, IonIcon, IonButtons, IonItem, IonNote, IonList } from '@ionic/angular/standalone';

const sharedFeatureImports = [
  CommonModule,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
];

@NgModule({
  imports: [...sharedFeatureImports],
  exports: [...sharedFeatureImports],
})
export class SharedFeatureModule {}
