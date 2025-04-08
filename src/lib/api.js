import { getPerformancesByFestivalAndDate } from '../data/performances';

// 模擬取得當天節目表資料
export async function fetchSchedule(festival, date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        date,
        performances: getPerformancesByFestivalAndDate(festival, date)
      });
    }, 100);
  });
}

// 模擬選擇/取消某節目的 API 呼叫
export async function togglePerformanceSelection(performanceId, selected) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Toggle performance ${performanceId} to ${selected}`);
      resolve();
    }, 100);
  });
}

// 模擬取得使用者已選的節目 ID
export async function getUserSelectedPerformances() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]); // 可改成回傳假資料測試
    }, 100);
  });
}
