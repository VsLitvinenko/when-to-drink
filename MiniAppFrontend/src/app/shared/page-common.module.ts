import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizePipe } from './localize';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon } from '@ionic/angular/standalone';

const pageCommonImports = [
  CommonModule,
  LocalizePipe,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonIcon,
]

@NgModule({
  imports: [...pageCommonImports],
  exports: [...pageCommonImports],
})
export class PageCommonModule {}
