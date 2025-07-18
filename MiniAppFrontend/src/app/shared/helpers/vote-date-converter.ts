import { format } from 'date-fns';
import { VoteDate } from 'src/app/features/vote-calendar/models';


export class VoteDateConverter {
  static get dayFormat(): string {
    return 'yyyy-MM-dd';
  }

  static get timeFormat(): string {
    return "yyyy-MM-dd'T'HH:mm:ss"
  };

  static toJsDates<T extends VoteDate>(item: T): T {
    return {
      ...item,
      date: new Date(item.date),
      start: item.start ? new Date(item.start) : undefined,
      end: item.end ? new Date(item.end) : undefined,
    }
  }

  static toStringDates(item: VoteDate): any {
    return {
      ...item,
      date: format(item.date, this.dayFormat),
      start: item.start ? format(item.start, this.timeFormat) : undefined,
      end: item.end ? format(item.end, this.timeFormat) : undefined,
    };
  }
}