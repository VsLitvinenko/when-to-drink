import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, ViewDidLeave, ViewWillEnter } from '@ionic/angular/standalone';
import { EventMainInfoComponent } from 'src/app/features/event-main-info';
import { ResultFiltersComponent } from 'src/app/features/result-filters';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';
import { ResultViewPickerContainerComponent, ResultViewPickerControlComponent, ViewPick } from '../../features/result-view-picker';
import { ResultViewCalendarComponent, ResultViewDirective, ResultViewListComponent } from 'src/app/features/result-view';
import { VotePageLocalize } from './vote-event-page.localize';
import { FeatureLoadDirective } from 'src/app/shared/directives';
import { Observable, of } from 'rxjs';
import { TelegramService } from 'src/app/core/services';
import { ConfirmService } from 'src/app/core/confirm';
import { LocalizeService } from 'src/app/shared/localize';

@Component({
  selector: 'app-vote-event-page',
  templateUrl: './vote-event-page.component.html',
  styleUrls: ['./vote-event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageCommonModule,
    VoteCalendarComponent,
    EventMainInfoComponent,
    ResultFiltersComponent,
    ResultViewPickerControlComponent,
    ResultViewPickerContainerComponent,
    ResultViewListComponent,
    ResultViewCalendarComponent,
    ResultViewDirective,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    FeatureLoadDirective,
  ],
  host: {
    class: 'app-page-inner',
  },
})
export class VoteEventPageComponent  implements ViewWillEnter, ViewDidLeave {
  public readonly eventId = input.required<string>();

  private readonly mainInfoComponent = viewChild(EventMainInfoComponent);
  private readonly voteCalendarComponent = viewChild(VoteCalendarComponent);

  private alreadyInit = false;
  private preventLeave = false;

  private readonly tg = inject(TelegramService);
  private readonly confirm = inject(ConfirmService);
  private readonly local = inject(LocalizeService);

  public readonly ViewPick = ViewPick;
  public readonly VotePageLocalize = VotePageLocalize;

  constructor() { }

  ionViewWillEnter(): void {
    if (this.alreadyInit) {
      this.mainInfoComponent()?.refreshInfo();
      this.voteCalendarComponent()?.resetDates$.next(true);
    } else {
      this.alreadyInit = true;
    }
  }

  ionViewDidLeave(): void {
    this.tg.toggleClosingConfirm(false);
  }

  canDeactivate(): Observable<boolean> {
    const header = this.local.localizeSync(VotePageLocalize.LeaveQuestion);
    const message = this.local.localizeSync(VotePageLocalize.LoseUnsaved);
    return this.preventLeave
      ? this.confirm.createConfirm({ header, message })
      : of(true);
  }

  public onNoUnsavedChanges(noUnsaved: boolean): void {
    this.preventLeave = !noUnsaved;
    this.tg.toggleClosingConfirm(!noUnsaved);
  }
}
