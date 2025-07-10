import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizeManyPipe, LocalizePipe } from './localize';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon, IonText } from '@ionic/angular/standalone';

const pageCommonImports = [
  CommonModule,
  LocalizePipe,
  LocalizeManyPipe,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonIcon,
  IonText,
]

@NgModule({
  imports: [...pageCommonImports],
  exports: [...pageCommonImports],
})
export class PageCommonModule {}
