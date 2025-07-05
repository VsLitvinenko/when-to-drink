import { Component, inject } from '@angular/core';
import { PageCommonModule } from 'src/app/shared';
import { EditEventFormComponent } from 'src/app/features/edit-event-form';
import { IonButton } from '@ionic/angular/standalone';
import { LocalizeService } from 'src/app/shared/localize';
import { ToastService } from 'src/app/core/services';
import { EditEventPageLocalize } from './edit-event-page.localize';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  
  private readonly localizeService = inject(LocalizeService);
  public readonly EditEventPageLocalize = EditEventPageLocalize;

  constructor() { }

  public copyToClipboard(): void {
    this.localizeService.localize(EditEventPageLocalize.ClipboardLink)
      .pipe(take(1))
      .subscribe((message) => this.toast.light(message, 'clipboard-outline'));
  }

  public redirectToEvent(): void {
    this.router.navigate(['vote']);
  }

}
