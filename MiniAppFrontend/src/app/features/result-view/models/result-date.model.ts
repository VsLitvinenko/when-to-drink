import { VoteType } from '../../vote-calendar/models';
import { ResultUser } from './result-user.model';

export interface ResultDate {
  date: Date;
  type: VoteType;
  users: ResultUser[];
}
