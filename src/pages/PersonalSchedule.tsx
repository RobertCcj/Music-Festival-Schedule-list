import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScheduleTable from '../components/ScheduleTable';
import StageFilter from '../components/StageFilter';
import { megaportStages, wildSeasonStages } from '../data/stages';
import { fetchSchedule, getUserSelectedPerformances, togglePerformanceSelection } from '../services/api';
import type { Performance } from '../types/schedule';

function PersonalSchedule() {
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedPerformances, setSelectedPerformances] = useState<Set<string>>(new Set());
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [currentDate, setCurrentDate] = useState('2025-03-29');
  const [currentFestival, setCurrentFestival] = useState('megaport');

  // 根據當前選擇的音樂祭獲取對應的舞台列表
  const stages = currentFestival === 'megaport' ? megaportStages : wildSeasonStages;

  // 初始化選中的舞台
  useEffect(() => {
    setSelectedStages(stages.map(stage => stage.id));
  }, [currentFestival, stages]);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const scheduleData = await fetchSchedule(currentFestival, currentDate);
        setPerformances(scheduleData.performances);
        
        const userSelections = await getUserSelectedPerformances();
        setSelectedPerformances(new Set(userSelections));
      } catch (error) {
        console.error('Failed to load schedule:', error);
      }
    };

    loadSchedule();
  }, [currentDate, currentFestival]);

  const handleStageToggle = (stageId: string) => {
    setSelectedStages(prev => 
      prev.includes(stageId)
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const handlePerformanceToggle = async (performanceId: string) => {
    try {
      const newSet = new Set(selectedPerformances);
      const isSelected = !newSet.has(performanceId);
      
      await togglePerformanceSelection(performanceId, isSelected);
      
      if (isSelected) {
        newSet.add(performanceId);
      } else {
        newSet.delete(performanceId);
      }
      
      setSelectedPerformances(newSet);
    } catch (error) {
      console.error('Failed to toggle performance:', error);
    }
  };

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
  };

  const handleFestivalChange = (festival: string) => {
    setCurrentFestival(festival);
  };

  const filteredStages = stages.filter(stage => selectedStages.includes(stage.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="flex-1 flex flex-col">
        {/* 上半部分：個人行程與控制項 */}
        <div className="sticky top-0 bg-white z-30 w-full border-b">
          <div className="max-w-[60%] mx-auto w-full p-4">
            <div className="flex flex-col gap-4">
              {/* 標題與日期選擇 */}
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">個人行程</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDateChange('2025-03-29')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentDate === '2025-03-29'
                        ? 'bg-[#EF6D21] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    3/29
                  </button>
                  <button
                    onClick={() => handleDateChange('2025-03-30')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentDate === '2025-03-30'
                        ? 'bg-[#EF6D21] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    3/30
                  </button>
                </div>
              </div>
              
              {/* 音樂祭與舞台選擇 */}
              <div className="flex flex-wrap sm:flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">音樂祭</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFestivalChange('megaport')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentFestival === 'megaport'
                          ? 'bg-[#EF6D21] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      大港開唱
                    </button>
                    <button
                      onClick={() => handleFestivalChange('wild')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentFestival === 'wild'
                          ? 'bg-[#EF6D21] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      野人季
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <StageFilter 
                    stages={stages}
                    selectedStages={selectedStages}
                    onToggle={handleStageToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 表格區域 */}
        <div className="flex-1">
          <div className="max-w-[60%] mx-auto w-full">
            <div className="overflow-auto max-h-[calc(100vh-180px)]">
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
                    performances={performances}
                    date={currentDate}
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