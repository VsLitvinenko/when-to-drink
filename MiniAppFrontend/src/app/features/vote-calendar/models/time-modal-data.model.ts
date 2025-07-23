export interface TimeModalData {
  time: boolean;
  start: string;
  end: string;
}

export type TimeModalDataAction = (opt: TimeModalData | undefined) => void;