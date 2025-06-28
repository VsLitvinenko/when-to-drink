import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon } from '@ionic/angular/standalone';

const pageCommonImports = [
  CommonModule,
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
