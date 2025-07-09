export enum VoteType {
  Ready = 'ready',
  Maybe = 'maybe',
  Time = 'time',
}

export interface VoteDate {
  date: Date;
  voteType: VoteType;
  start?: Date;
  end?: Date; 
}