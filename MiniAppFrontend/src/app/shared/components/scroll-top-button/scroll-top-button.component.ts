import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LocalizePipe } from '../../localize';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { auditTime, distinctUntilChanged, map, share, startWith } from 'rxjs';
import { ScrollTopButtonLocalize } from './scroll-top-button.localize';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
  imports: [
    CommonModule,
    LocalizePipe,
    IonButton,
    IonIcon,
  ],
  animations: [
    trigger('ifAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.25s ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class ScrollTopButtonComponent implements OnInit {
  @Input() animationTime: number = 250;
  @Input() thresholdPx: number = 400;

  private readonly ionContent = inject(IonContent);

  public readonly ScrollTopButtonLocalize = ScrollTopButtonLocalize;
  public manualHideButton: boolean = false;

  public showButton$ = this.ionContent.ionScroll.pipe(
    auditTime(250),
    map((event) => event.detail.scrollTop > this.thresholdPx),
    startWith(false),
    distinctUntilChanged(),
    share()
  );

  constructor() { }

  ngOnInit(): void {
    this.ionContent.scrollEvents = true;
  }

  public scrollTop(): void {
    this.manualHideButton = true;
    this.ionContent.scrollToTop(this.animationTime)
      .then(() => this.manualHideButton = false);
  }

}
