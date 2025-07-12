import { Component, input, viewChild } from '@angular/core';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, ViewWillEnter } from '@ionic/angular/standalone';
import { EventMainInfoComponent } from 'src/app/features/event-main-info';
import { ResultFiltersComponent } from 'src/app/features/result-filters';
import { VoteCalendarComponent } from 'src/app/features/vote-calendar';
import { PageCommonModule } from 'src/app/shared';
import { ResultViewPickerContainerComponent, ResultViewPickerControlComponent, ViewPick } from '../../features/result-view-picker';
import { ResultViewCalendarComponent, ResultViewDirective, ResultViewListComponent } from 'src/app/features/result-view';
import { VotePageLocalize } from './vote-event-page.localize';
import { FeatureLoadDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-vote-event-page',
  templateUrl: './vote-event-page.component.html',
  styleUrls: ['./vote-event-page.component.scss'],
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
export class VoteEventPageComponent  implements ViewWillEnter {
  public readonly eventId = input.required<string>();
  private readonly mainInfoComponent = viewChild(EventMainInfoComponent);
  private alreadyInit = false;

  public readonly ViewPick = ViewPick;
  public readonly VotePageLocalize = VotePageLocalize;

  constructor() { }

  ionViewWillEnter(): void {
    if (this.alreadyInit) {
      this.mainInfoComponent()?.refresh();
    } else {
      this.alreadyInit = true;
    }
  }
}
