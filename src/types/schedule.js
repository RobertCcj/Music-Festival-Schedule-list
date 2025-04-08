// export interface Performance {
//   id;
//   name;
//   startTime;
//   endTime;
//   date;
//   stageId;
//   description?;
//   country?;
// }

// export interface Stage {
//   id;
//   name;
//   color;
// }

// export interface ScheduleDay {
//   date;
//   performances: Performance[];
// }

/**
 * @typedef {Object} Performance
 * @property {string} id
 * @property {string} name
 * @property {string} startTime
 * @property {string} endTime
 * @property {string} date
 * @property {string} stageId
 * @property {string} [description]
 * @property {string} [country]
 */

/**
 * @typedef {Object} Stage
 * @property {string} id
 * @property {string} name
 * @property {string} color
 */

/**
 * @typedef {Object} ScheduleDay
 * @property {string} date
 * @property {Performance[]} performances
 */

// Example data structure in JS (for demonstration only)
const examplePerformance = {
  id: 'abc123',
  name: 'Example Band',
  startTime: '14:00',
  endTime: '15:00',
  date: '2025-03-29',
  stageId: 'stage1',
  description: 'An awesome band!',
  country: 'Taiwan'
};

const exampleStage = {
  id: 'stage1',
  name: '大港主舞台',
  color: 'bg-red-400'
};

const exampleSchedule = {
  date: '2025-03-29',
  performances: [examplePerformance]
};
