import { Component } from '@angular/core';
import { PageCommonModule } from 'src/app/shared';
import { NotPermittedPageLocalize } from './not-permitted-page.localize';

@Component({
  selector: 'app-not-permitted-page',
  templateUrl: './not-permitted-page.component.html',
  styleUrls: ['./not-permitted-page.component.scss'],
  imports: [PageCommonModule],
  host: {
    class: 'app-page-inner',
  },
})
export class NotPermittedPageComponent {

  public readonly NotPermittedPageLocalize = NotPermittedPageLocalize;
  constructor() { }

}
