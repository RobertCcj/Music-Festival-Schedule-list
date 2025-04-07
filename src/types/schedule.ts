export interface Performance {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
  stageId: string;
  description?: string;
  country?: string;
}

export interface Stage {
  id: string;
  name: string;
  color: string;
}

export interface ScheduleDay {
  date: string;
  performances: Performance[];
}