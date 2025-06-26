import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
  exports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class PageCommonModule {}
