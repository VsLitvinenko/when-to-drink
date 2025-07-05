import { Component, inject } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { PageCommonModule } from 'src/app/shared';
import { NotFoundPageLocalize } from './not-found-page.localize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  imports: [
    PageCommonModule,
    IonButton,
  ],
})
export class NotFoundPageComponent {

  public readonly NotFoundPageLocalize = NotFoundPageLocalize;
  private readonly router = inject(Router);

  constructor() { }

  public routeToCreate(): void {
    this.router.navigate(['edit']);
  }

}
