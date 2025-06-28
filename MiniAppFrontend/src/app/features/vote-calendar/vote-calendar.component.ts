import { Component, computed, OnInit, signal } from '@angular/core';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { IonDateSpecifyDirective } from './directives';
import { format } from 'date-fns';
import { VoteDate } from './models';
import { FormsModule } from '@angular/forms';


const timeFormat = "yyyy-MM-dd'T'HH:mm:ss";

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
    FormsModule,
  ]
})
export class VoteCalendarComponent  implements OnInit {

  public voteDates: VoteDate[] = [];

  public readonly startTime = signal(format(new Date(), timeFormat));
  public readonly endTime = signal(format(new Date(), timeFormat));
  
  public readonly isTimeInvalid = computed(() => {
    const startDate = new Date(this.startTime());
    const endDate = new Date(this.endTime());
    return startDate >= endDate;
  });

  constructor() { }

  ngOnInit() { }

  public updateTime(voteDate?: VoteDate): void {
    const nowTime = format(new Date(), timeFormat);
    const startValue = voteDate?.start
      ? format(voteDate.start, timeFormat)
      : nowTime;
    const endValue = voteDate?.end
      ? format(voteDate.end, timeFormat)
      : nowTime;
      
    this.startTime.set(startValue);
    this.endTime.set(endValue);
  }

  public onResetChanges(): void {
    console.log('Reset changes');
    this.voteDates = [];
  }

  public onSaveChanges(voteDates: VoteDate[]): void {
    console.log('Saved vote dates:', voteDates);
  }
  
}
