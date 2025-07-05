import { Component, OnInit } from '@angular/core';
import { PageCommonModule } from 'src/app/shared';
import { EditEventFormComponent } from 'src/app/features/edit-event-form';

@Component({
  selector: 'app-update-event-page',
  templateUrl: './update-event-page.component.html',
  styleUrls: ['./update-event-page.component.scss'],
  imports: [
    PageCommonModule,
    EditEventFormComponent,
  ],
  host: {
    class: 'app-page-inner',
  },
})
export class UpdateEventPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
