import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ViewPick } from '../models/view-pick.enum';


const timing = '0.4s ease-in-out';
const visible = { transform: 'translateX(0)' };
const leaveEnd = { transform: `translateX({{ leaveEnd }}%)` };
const enterStart = { transform: `translateX({{ enterStart }}%)` };

@Component({
  selector: 'app-result-view-picker-container',
  templateUrl: './result-view-picker-container.component.html',
  styleUrls: ['./result-view-picker-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openCloseResultView', [
      transition('* => *',
        [
          group([
            query(':enter', style(enterStart)),
            query(':leave', [animate(timing, style(leaveEnd))], { optional: true }),
            query(':enter', [animate(timing), style(visible)]),
          ])
        ],
        { params: { leaveEnd: -120, enterStart: 120, } }
      ),
    ]),
  ],
})
export class ResultViewPickerContainerComponent {

  public readonly viewPick = input.required<ViewPick>();
  public readonly animationDisabled = signal(true);

  public readonly animationParams = computed(() => {
    switch (this.viewPick()) {
      case ViewPick.List:
        return { leaveEnd: 120, enterStart: -120 };
      case ViewPick.Calendar:
        return { leaveEnd: -120, enterStart: 120 };
      default:
        return {};
    }
  });

  constructor() {
    afterNextRender(() => {
      if (this.animationDisabled()) {
        // enable animation after init
        this.animationDisabled.set(false);
      }
    });
  }
}
