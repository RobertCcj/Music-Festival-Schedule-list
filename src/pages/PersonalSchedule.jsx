import React, { useState } from 'react';
import Header from '../components/Header';
import ScheduleTable from '../components/ScheduleTable';
import StageFilter from '../components/StageFilter';

const stages = [
  { id: 'rainbowHeaven', name: '雨霸天', color: 'bg-green-400' },
  { id: 'seaKing', name: '海龍王', color: 'bg-purple-400' },
  { id: 'goddessTemple', name: '女神龍', color: 'bg-pink-500' },
  { id: 'seaWave', name: '海波浪', color: 'bg-blue-400' },
  { id: 'cardMagic', name: '卡魔麥', color: 'bg-red-400' },
  { id: 'sunHead', name: '出頭天', color: 'bg-yellow-400' },
  { id: 'bigMagic', name: '大魔丸', color: 'bg-orange-500' },
  { id: 'blueStone', name: '藍寶石', color: 'bg-blue-600' },
  { id: 'youthSpring', name: '青春夢', color: 'bg-pink-400' },
  { id: 'smallPort', name: '小港祭', color: 'bg-orange-300' }
];

function PersonalSchedule() {
  const [selectedStages, setSelectedStages] = useState(stages.map(stage => stage.id));
  const [selectedPerformances, setSelectedPerformances] = useState(new Set());

  const handleStageToggle = (stageId) => {
    setSelectedStages(prev => 
      prev.includes(stageId)
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const handlePerformanceToggle = (performanceId) => {
    setSelectedPerformances(prev => {
      const newSet = new Set(prev);
      if (newSet.has(performanceId)) {
        newSet.delete(performanceId);
      } else {
        newSet.add(performanceId);
      }
      return newSet;
    });
  };

  const filteredStages = stages.filter(stage => selectedStages.includes(stage.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="flex-1 flex flex-col">
        {/* 上半部分：個人行程與舞台選擇 */}
        <div className="sticky top-0 bg-white z-30 w-full border-b">
          <div className="max-w-[60%] mx-auto w-full p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">個人行程</h1>
              <StageFilter 
                stages={stages}
                selectedStages={selectedStages}
                onToggle={handleStageToggle}
              />
            </div>
          </div>
        </div>

        {/* 表格區域 */}
        <div className="flex-1">
          <div className="max-w-[60%] mx-auto w-full">
            <div className="overflow-auto max-h-[calc(100vh-140px)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-30 bg-white p-2 min-w-[80px] text-sm">
                      時間
                    </th>
                    {filteredStages.map(stage => (
                      <th 
                        key={stage.id} 
                        className={`sticky top-0 z-20 ${stage.color} text-white p-2 min-w-[160px]`}
                      >
                        {stage.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ScheduleTable 
                    stages={filteredStages}
                    selectedPerformances={selectedPerformances}
                    onPerformanceToggle={handlePerformanceToggle}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalSchedule;