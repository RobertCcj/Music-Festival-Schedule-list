import React from 'react';

// Generate time slots from 12:30 to 21:50
const timeSlots = [];
for (let hour = 12; hour <= 21; hour++) {
  for (let minute of ['30', '40', '50']) {
    if (hour === 21 && minute === '50') {
      timeSlots.push(`${hour}:${minute}`);
      break;
    }
    timeSlots.push(`${hour}:${minute}`);
  }
}

// Helper function to calculate row span based on start and end times
const calculateTimeSpan = (startTime, endTime) => {
  const startIndex = timeSlots.indexOf(startTime);
  const endIndex = timeSlots.indexOf(endTime);
  return endIndex - startIndex + 1;
};

function ScheduleTable({ stages, selectedPerformances, onPerformanceToggle }) {
  // Real performance data based on the schedule image
  const performances = {
    'rainbowHeaven': [
      { id: 'p1', name: '優心飲絕', startTime: '12:30', endTime: '13:10' },
      { id: 'p2', name: 'Megaport\nWandering', startTime: '14:10', endTime: '14:40' },
      { id: 'p3', name: 'BATTLES\n[US]', startTime: '16:00', endTime: '16:40' },
      { id: 'p4', name: 'Creepy\nNuts\n[JP]', startTime: '17:30', endTime: '18:00' },
      { id: 'p5', name: 'UVERworld\n[JP]', startTime: '19:20', endTime: '19:50' },
      { id: 'p6', name: '閃靈', startTime: '21:10', endTime: '21:40' }
    ],
    'seaKing': [
      { id: 'p7', name: '南西肯恩', startTime: '12:40', endTime: '13:10' },
      { id: 'p8', name: '再會陳一郎', startTime: '13:20', endTime: '13:50' },
      { id: 'p9', name: '相遠大港邊', startTime: '13:30', endTime: '14:00' },
      { id: 'p10', name: 'VH\nft.\n岑寧兒\nYoyo Sham', startTime: '14:50', endTime: '15:20' }
      // Add more performances based on the image...
    ],
    // Add more stages...
  };

  const getPerformanceStyle = (performance) => {
    const isSelected = selectedPerformances.has(performance.id);
    return `
      ${isSelected ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}
      flex items-center justify-center text-center whitespace-pre-line
      hover:opacity-90 transition-opacity cursor-pointer rounded-lg
      h-full px-2 py-1
    `;
  };

  // Create a map to track which cells should be rendered
  const occupiedCells = new Map();
  stages.forEach(stage => {
    performances[stage.id]?.forEach(performance => {
      const startIndex = timeSlots.indexOf(performance.startTime);
      const span = calculateTimeSpan(performance.startTime, performance.endTime);
      for (let i = 0; i < span; i++) {
        occupiedCells.set(`${stage.id}-${timeSlots[startIndex + i]}`, true);
      }
    });
  });

  return (
    <>
      {timeSlots.map((time) => (
        <tr key={time} className="h-12">
          <td className="sticky left-0 bg-white z-10 text-center text-sm px-2">
            {time}
          </td>
          {stages.map(stage => {
            const performance = performances[stage.id]?.find(p => p.startTime === time);
            if (performance) {
              const span = calculateTimeSpan(performance.startTime, performance.endTime);
              return (
                <td 
                  key={`${stage.id}-${time}`}
                  rowSpan={span}
                  className="relative p-1"
                >
                  <div
                    onClick={() => onPerformanceToggle(performance.id)}
                    className={getPerformanceStyle(performance)}
                  >
                    {performance.name}
                  </div>
                </td>
              );
            } else if (!occupiedCells.has(`${stage.id}-${time}`)) {
              return <td key={`${stage.id}-${time}`} className="p-1" />;
            }
            return null;
          })}
        </tr>
      ))}
    </>
  );
}

export default ScheduleTable;