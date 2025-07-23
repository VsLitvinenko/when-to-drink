export interface TimeModalData {
  time: boolean;
  start: string;
  end: string;
}

export type TimeModalDataParam = TimeModalData | undefined;
export type TimeModalDataAction = (opt?: TimeModalData) => void;