import { Performance, ScheduleDay } from '../types/schedule';
import { getPerformancesByFestivalAndDate } from '../data/performances';

export async function fetchSchedule(festival: string, date: string): Promise<ScheduleDay> {
  // 模擬 API 呼叫
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        date,
        performances: getPerformancesByFestivalAndDate(festival, date)
      });
    }, 100);
  });
}

export async function togglePerformanceSelection(performanceId: string, selected: boolean): Promise<void> {
  // 模擬 API 呼叫
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Toggle performance ${performanceId} to ${selected}`);
      resolve();
    }, 100);
  });
}

export async function getUserSelectedPerformances(): Promise<string[]> {
  // 模擬 API 呼叫
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 100);
  });
}