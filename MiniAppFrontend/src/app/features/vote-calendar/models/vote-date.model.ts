export enum VoteType {
  Ready = 'ready',
  Maybe = 'maybe',
  Time = 'time',
}

export interface VoteDate {
  date: Date;
  type: VoteType;
  start?: Date;
  end?: Date; 
}