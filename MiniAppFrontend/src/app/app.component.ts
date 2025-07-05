import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TelegramService, ThemeService } from './core/services';
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
  arrowRedoOutline,
  linkOutline,
} from 'ionicons/icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  private readonly tg = inject(TelegramService);
  private readonly theme = inject(ThemeService);

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
      arrowRedoOutline,
      linkOutline,
    })
  }

  ngOnInit(): void {
    this.tg.initApp();
    this.tg.colorScheme$
      .pipe(take(1))
      .subscribe((cs) => this.theme.changeColorScheme(cs));
  }
}
