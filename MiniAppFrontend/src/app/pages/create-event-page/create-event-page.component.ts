import { Component, OnInit } from '@angular/core';
import { PageCommonModule } from 'src/app/shared';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss'],
  imports: [
    PageCommonModule,
  ],
})
export class CreateEventPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
