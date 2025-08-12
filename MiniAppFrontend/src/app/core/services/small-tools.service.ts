import { Injectable } from '@angular/core';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SmallToolsService {

  public readonly isTouchDevice: Boolean =
    matchMedia('(pointer: coarse)').matches ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);
  

  private readonly daysOfWeekWithoutOrder: Date[] = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date())
  });

  public readonly daysOfWeek = this.daysOfWeekWithoutOrder
    .concat(this.daysOfWeekWithoutOrder[0])
    .slice(1)
}
