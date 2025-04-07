import { Performance } from '../types/schedule';

export const megaportPerformances: Performance[] = [
  // 3/29 南霸天
  {
    id: 'heartbreak-0329',
    name: '傷心欲絕',
    startTime: '12:30',
    endTime: '13:10',
    date: '2025-03-29',
    stageId: 'rainbow-heaven'
  },
  {
    id: 'megaport-wandering-0329',
    name: 'Megaport Wandering\n溫蒂漫步大樂隊',
    startTime: '14:10',
    endTime: '14:50',
    date: '2025-03-29',
    stageId: 'rainbow-heaven'
  },
  {
    id: 'battles-0329',
    name: 'BATTLES',
    startTime: '15:50',
    endTime: '16:30',
    date: '2025-03-29',
    stageId: 'rainbow-heaven',
    country: 'US'
  },
  {
    id: 'creepy-nuts-0329',
    name: 'Creepy Nuts',
    startTime: '17:30',
    endTime: '18:10',
    date: '2025-03-29',
    stageId: 'rainbow-heaven',
    country: 'JP'
  },
  {
    id: 'uverworld-0329',
    name: 'UVERworld',
    startTime: '19:10',
    endTime: '19:50',
    date: '2025-03-29',
    stageId: 'rainbow-heaven',
    country: 'JP'
  },
  {
    id: 'chthonic-0329',
    name: '閃靈',
    startTime: '21:00',
    endTime: '21:50',
    date: '2025-03-29',
    stageId: 'rainbow-heaven'
  }
];

export const wildSeasonPerformances: Performance[] = [
  // Stage 1
  {
    id: 'wild-1-1',
    name: '表演者 A',
    startTime: '12:30',
    endTime: '13:10',
    date: '2025-03-29',
    stageId: 'stage-1'
  },
  {
    id: 'wild-1-2',
    name: '表演者 B',
    startTime: '14:10',
    endTime: '14:50',
    date: '2025-03-29',
    stageId: 'stage-1'
  },
  {
    id: 'wild-1-3',
    name: '表演者 C',
    startTime: '15:50',
    endTime: '16:30',
    date: '2025-03-29',
    stageId: 'stage-1'
  },
  
  // Stage 2
  {
    id: 'wild-2-1',
    name: '表演者 D',
    startTime: '13:10',
    endTime: '13:50',
    date: '2025-03-29',
    stageId: 'stage-2'
  },
  {
    id: 'wild-2-2',
    name: '表演者 E',
    startTime: '14:40',
    endTime: '15:20',
    date: '2025-03-29',
    stageId: 'stage-2'
  },
  {
    id: 'wild-2-3',
    name: '表演者 F',
    startTime: '16:00',
    endTime: '16:40',
    date: '2025-03-29',
    stageId: 'stage-2'
  },
  
  // Stage 3
  {
    id: 'wild-3-1',
    name: '表演者 G',
    startTime: '13:00',
    endTime: '13:40',
    date: '2025-03-29',
    stageId: 'stage-3'
  },
  {
    id: 'wild-3-2',
    name: '表演者 H',
    startTime: '14:30',
    endTime: '15:10',
    date: '2025-03-29',
    stageId: 'stage-3'
  },
  {
    id: 'wild-3-3',
    name: '表演者 I',
    startTime: '16:00',
    endTime: '16:40',
    date: '2025-03-29',
    stageId: 'stage-3'
  }
];

export function getPerformancesByFestivalAndDate(festival: string, date: string): Performance[] {
  const performances = festival === 'megaport' ? megaportPerformances : wildSeasonPerformances;
  return performances.filter(performance => performance.date === date);
}