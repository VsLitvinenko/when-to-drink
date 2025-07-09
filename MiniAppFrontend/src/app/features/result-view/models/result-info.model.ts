import { ResultDate } from './result-date.model';

export interface ResultInfo {
  eventId: string;
  maxOverlap: number;
  dates: ResultDate[];
}
