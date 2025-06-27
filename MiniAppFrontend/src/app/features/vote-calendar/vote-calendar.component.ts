import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { IonDateSpecifyDirective } from './directives';
import { format } from 'date-fns';
import { VoteDate } from './models';


@Component({
  selector: 'app-vote-calendar',
  templateUrl: './vote-calendar.component.html',
  styleUrls: ['./vote-calendar.component.scss'],
  imports: [
    SharedFeatureModule,
    IonDateSpecifyDirective,
    IonDatetime,
    IonChip,
    IonPopover,
    IonModal,
  ]
})
export class VoteCalendarComponent  implements OnInit {

  public readonly nowDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  
  constructor() { }

  ngOnInit() { }

  public isStartLessThanEnd(start: any, end: any): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return startDate < endDate;
  }

  public onResetChanges(): void {
    console.log('Reset changes');
  }

  public onSaveChanges(voteDates: VoteDate[]): void {
    console.log('Saved vote dates:', voteDates);
  }
  
}
