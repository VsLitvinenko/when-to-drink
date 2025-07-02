import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TelegramService } from './core/services';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  checkmarkOutline,
  timeOutline,
  helpOutline,
  removeOutline,
  closeOutline,
  refreshOutline,
  calendarOutline,
  listOutline,
  calendarClearOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private readonly tg = inject(TelegramService);

  constructor() {
    addIcons({
      chevronForwardOutline,
      checkmarkOutline,
      timeOutline,
      helpOutline,
      removeOutline,
      closeOutline,
      refreshOutline,
      calendarOutline,
      listOutline,
      calendarClearOutline,
    })
  }

  ngOnInit(): void {
    this.tg.initApp();
  }
}
