import { VoteDate } from '../../vote-calendar/models';
import { ResultUser } from './result-user.model';

export interface ResultDate extends VoteDate {
  noTimeOverlap?: boolean;
  users: ResultUser[];
}
