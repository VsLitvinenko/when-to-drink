import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  checkmarkOutline,
  timeOutline,
  helpOutline,
  removeOutline,
  closeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      chevronForwardOutline,
      checkmarkOutline,
      timeOutline,
      helpOutline,
      removeOutline,
      closeOutline,
    })
  }
}
