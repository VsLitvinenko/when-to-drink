import { Component, computed, inject, signal } from '@angular/core';
import { IonDatetime, IonChip, IonPopover, IonModal } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { IonDateSpecifyDirective } from './directives';
import { format } from 'date-fns';
import { VoteDate } from './models';
import { FormsModule } from '@angular/forms';
import { fakeCalendar } from 'src/app/core/mock-data';
import { SmallToolsService, ToastService } from 'src/app/core/services';
import { LocalizeService } from 'src/app/shared/localize';
import { VoteCalendarLocalize } from './vote-calendar.localize';
import { take } from 'rxjs';


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
  ],
})
export class VoteCalendarComponent {
  public voteDates: VoteDate[] = fakeCalendar;

  public readonly startTime = signal(format(new Date(), timeFormat));
  public readonly endTime = signal(format(new Date(), timeFormat));
  
  public readonly isTimeInvalid = computed(() => {
    const startDate = new Date(this.startTime());
    const endDate = new Date(this.endTime());
    return startDate >= endDate;
  });

  private readonly toast = inject(ToastService);
  private readonly tools = inject(SmallToolsService);
  public readonly isTouchDevice = this.tools.isTouchDevice;

  private readonly localizeService = inject(LocalizeService);
  public readonly localizeFormat$ = this.localizeService.localizationWithFormat$;
  public readonly VoteCalendarLocalize = VoteCalendarLocalize;

  constructor() { }

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

  public clearDates(): void {
    console.log('Clear changes');
    this.voteDates = [];
  }

  public resetDates(): void {
    console.log('Reset changes');
    this.voteDates = [...fakeCalendar];
  }

  public saveDates(voteDates: VoteDate[]): void {
    console.log('Saved vote dates:', voteDates);
    this.localizeService.localize(VoteCalendarLocalize.HasBeenSaved)
      .pipe(take(1))
      .subscribe((message) => this.toast.info(message));
  }
  
}
