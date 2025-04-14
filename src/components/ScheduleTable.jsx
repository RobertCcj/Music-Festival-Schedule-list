import React from "react";

// Generate time slots from 12:30 to 22:10
const timeSlots = [];
for (let hour = 12; hour <= 22; hour++) {
  for (let minute of ["00", "10", "20", "30", "40", "50"]) {
    if (hour === 22 && minute === "10") {
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
  return Math.max(1, endIndex - startIndex + 1);
};

function ScheduleTable({
  stages,
  selectedPerformances,
  onPerformanceToggle,
  performances,
  date,
}) {
  // 顏色轉換(因為Tailwind預設不會編譯動態 class name)
  const getDarkenedColor = (originalColor) => {
    const colorMap = {
      'bg-green-400': 'bg-green-700',
      'bg-orange-300': 'bg-orange-600',
      'bg-purple-400': 'bg-purple-700',
      'bg-pink-500': 'bg-pink-800',
      'bg-blue-400': 'bg-blue-700',
      'bg-red-400': 'bg-red-700',
      'bg-yellow-400': 'bg-yellow-700',
      'bg-red-600': 'bg-red-900',
      'bg-blue-600': 'bg-blue-900',
      'bg-pink-400': 'bg-pink-700',
      'bg-amber-500': 'bg-amber-800',
      'bg-rose-300': 'bg-rose-600',
    };
  
    return colorMap[originalColor] || originalColor;
  };
  
  const getPerformanceStyle = (performance, stage) => {
    const isSelected = selectedPerformances.has(performance.id);
    const colorClass = isSelected
      ? getDarkenedColor(stage.color)
      : `${stage.color} bg-opacity-80`;
  
    return `
      ${colorClass} text-white
      flex items-center justify-center text-center whitespace-pre-line
      hover:opacity-90 transition-opacity cursor-pointer rounded-lg
      h-full px-2 py-1 text-sm font-medium
    `;
  };
  // Create a map to track which cells should be rendered
  const occupiedCells = new Map();
  stages.forEach((stage) => {
    const stagePerformances = performances.filter(
      (p) => p.stageId === stage.id && p.date === date
    );
    stagePerformances.forEach((performance) => {
      const startIndex = timeSlots.indexOf(performance.startTime);
      const span = calculateTimeSpan(
        performance.startTime,
        performance.endTime
      );
      for (let i = 0; i < span; i++) {
        occupiedCells.set(`${stage.id}-${timeSlots[startIndex + i]}`, true);
      }
    });
  });

  const formatPerformanceName = (name, country) => {
    return country ? `${name}\n[${country}]` : name;
  };

  return (
    <>
      {timeSlots.map((time) => (
        <tr key={time} className="h-12 border-t border-gray-100">
          <td className="sticky left-0 bg-white z-10 text-center text-sm px-2 text-gray-600 font-medium">
            {time}
          </td>
          {stages.map((stage) => {
            const performance = performances.find(
              (p) =>
                p.startTime === time &&
                p.stageId === stage.id &&
                p.date === date
            );

            if (performance) {
              const span = calculateTimeSpan(
                performance.startTime,
                performance.endTime
              );
              return (
                <td
                  key={`${stage.id}-${time}`}
                  rowSpan={span}
                  className="relative p-1"
                >
                  <div
                    onClick={() => onPerformanceToggle(performance.id)}
                    className={getPerformanceStyle(performance, stage)}
                    style={{
                      height: `${
                        calculateTimeSpan(
                          performance.startTime,
                          performance.endTime
                        ) * 48
                      }px`,
                    }}
                  >
                    <div className="flex h-full items-center justify-center text-center">
                      {formatPerformanceName(
                        performance.name,
                        performance.country
                      )}
                    </div>
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
