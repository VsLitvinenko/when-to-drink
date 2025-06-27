import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
  ],
  exports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
  ],
})
export class PageCommonModule {}
