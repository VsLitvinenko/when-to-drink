import { Component, inject, input } from '@angular/core';
import { PageCommonModule } from 'src/app/shared';
import { EditEventFormComponent } from 'src/app/features/edit-event-form';
import { IonButton } from '@ionic/angular/standalone';
import { LocalizeService } from 'src/app/shared/localize';
import { TelegramService, ToastService } from 'src/app/core/services';
import { EditEventPageLocalize } from './edit-event-page.localize';
import { Router } from '@angular/router';
import { from, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-edit-event-page',
  templateUrl: './edit-event-page.component.html',
  styleUrls: ['./edit-event-page.component.scss'],
  imports: [
    PageCommonModule,
    EditEventFormComponent,
    IonButton,
  ],
  host: {
    class: 'app-page-inner',
  },
})
export class EditEventPageComponent {
  // query param input
  public readonly eventId = input<string | undefined>();

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly tg = inject(TelegramService);
  
  private readonly local = inject(LocalizeService);
  public readonly EditEventPageLocalize = EditEventPageLocalize;

  constructor() { }

  public copyToClipboard(): void {
    this.tg.getEventTgLink(this.eventId()!)
      .pipe(
        switchMap((link) => from(navigator.clipboard.writeText(link))),
        take(1)
      )
      .subscribe(() => {
        const toastMessage = this.local.localizeSync(EditEventPageLocalize.ClipboardLink);
        this.toast.light(toastMessage, 'clipboard-outline')
      });
  }

  public share(): void {
    if (this.eventId()) {
      this.tg.shareEvent(this.eventId() as string);
    }
  }

  public redirectToEvent(): void {
    this.router.navigate(['vote', this.eventId()]);
  }

}
