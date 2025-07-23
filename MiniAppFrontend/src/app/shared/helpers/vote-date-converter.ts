import { format } from 'date-fns';
import { VoteDate } from 'src/app/features/vote-calendar/models';


export class VoteDateConverter {

  static toJsDates<T extends VoteDate>(item: T): T {
    const date = {
      ...item,
      date: new Date(item.date),
      start: item.start ? new Date(item.start) : undefined,
      end: item.end ? new Date(item.end) : undefined,
    };
    if (item.start === undefined) { delete date.start; }
    if (item.end === undefined) { delete date.end; }
    return date;
  }

  static toStringDates(item: VoteDate): any {
    return {
      ...item,
      date: format(item.date, 'yyyy-MM-dd'),
      start: item.start ? format(item.start, "yyyy-MM-dd'T'HH:mm:ss") : undefined,
      end: item.end ? format(item.end, "yyyy-MM-dd'T'HH:mm:ss") : undefined,
    };
  }
  
}