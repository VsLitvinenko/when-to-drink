import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TelegramService, ThemeService } from './core/services';
import { Subject, takeUntil } from 'rxjs';
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
  clipboardOutline,
  arrowRedoOutline,
  linkOutline,
  cloudDoneOutline,
  ellipsisVertical,
  shareSocialOutline,
  createOutline,
  arrowForward,
  alertCircleOutline,
  trashOutline,
  addOutline,
  banOutline,
} from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly tg = inject(TelegramService);
  private readonly theme = inject(ThemeService);
  private readonly destroyed$ = new Subject<void>();

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
      clipboardOutline,
      arrowRedoOutline,
      linkOutline,
      cloudDoneOutline,
      ellipsisVertical,
      shareSocialOutline,
      createOutline,
      arrowForward,
      alertCircleOutline,
      trashOutline,
      addOutline,
      banOutline,
    });
  }

  ngOnInit(): void {
    this.tg.colorScheme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cs) => this.theme.changeColorScheme(cs));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.complete();
  }
}
