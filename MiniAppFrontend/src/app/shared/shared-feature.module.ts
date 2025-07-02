import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizePipe } from './localize';
import { IonButton, IonLabel, IonIcon, IonButtons, IonItem, IonNote, IonList, IonText } from '@ionic/angular/standalone';

const sharedFeatureImports = [
  CommonModule,
  LocalizePipe,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonText,
];

@NgModule({
  imports: [...sharedFeatureImports],
  exports: [...sharedFeatureImports],
})
export class SharedFeatureModule {}
