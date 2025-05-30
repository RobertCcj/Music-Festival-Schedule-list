import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import StageFilter from '../components/StageFilter';
import ScheduleTable from '../components/ScheduleTable';
import { getPerformancesByFestivalAndDate } from '../data/performances';
import { megaportStages, wildSeasonStages } from '../data/stages';

export default function TeamSchedule() {
  // === 狀態管理 ===
  const [currentFestival, setCurrentFestival] = useState('megaport');
  const [currentDate, setCurrentDate] = useState('2025-03-29');
  const [stages, setStages] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedPerformances, setSelectedPerformances] = useState(new Set());
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  // 靜態可選團隊
  const availableTeams = [
    { id: 'teamX', name: '團隊 X' },
    { id: 'teamY', name: '團隊 Y' },
    { id: 'teamZ', name: '團隊 Z' },
  ];

  // 音樂祭可選日期
  const festivalDates = {
    megaport: ['2025-03-29', '2025-03-30'],
    wild:     ['2025-04-26', '2025-04-27'],
  };

  // 當音樂祭或日期變動時，重置 stages、performances、篩選狀態
  useEffect(() => {
    const newStages = currentFestival === 'megaport'
      ? megaportStages
      : wildSeasonStages;
    setStages(newStages);
    setSelectedStages(newStages.map(s => s.id));

    const list = getPerformancesByFestivalAndDate(
      currentFestival,
      currentDate
    );
    setPerformances(list);
    setSelectedPerformances(new Set());
  }, [currentFestival, currentDate]);

  // 舞台切換
  const handleStageToggle = (stageId) => {
    setSelectedStages(prev =>
      prev.includes(stageId)
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  // 演出選取切換（團隊模式用）
  const handlePerformanceToggle = (performanceId) => {
    setSelectedPerformances(prev => {
      const next = new Set(prev);
      next.has(performanceId) ? next.delete(performanceId) : next.add(performanceId);
      return next;
    });
  };

  // 音樂祭切換
  const handleFestivalChange = (festival) => {
    setCurrentFestival(festival);
    setCurrentDate(festivalDates[festival][0]);
  };

  // 日期切換
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  // 加入團隊
  const handleJoinTeam = (team) => {
    if (!userTeams.some(t => t.id === team.id)) {
      setUserTeams(prev => [...prev, team]);
      setSelectedTeamId(team.id);
    }
    setShowJoinModal(false);
  };

  // 根據選擇的舞台過濾演出
  const filteredPerformances = useMemo(() => {
    if (selectedStages.length === 0) return performances;
    return performances.filter(p => selectedStages.includes(p.stageId));
  }, [performances, selectedStages]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header showMenu />

      {/* 預留 Header 高度 */}
      <div className="flex-1 flex flex-col pt-16">
        {/* Sticky 控制區 */}
        <div className="sticky top-0 z-30 bg-white border-b">
          <div className="w-full p-4 max-w-full md:max-w-[80%] mx-auto flex flex-col gap-4">
            {/* 標題＆日期切換 */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">團隊行程</h1>
              <div className="flex gap-2 overflow-auto">
                {festivalDates[currentFestival].map(d => (
                  <button
                    key={d}
                    onClick={() => handleDateChange(d)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      currentDate === d
                        ? 'bg-[#EF6D21] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {d.slice(5).replace('-', '/')}
                  </button>
                ))}
              </div>
            </div>

            {/* 音樂祭切換 ＋ 舞台篩選 */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleFestivalChange('megaport')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentFestival === 'megaport'
                      ? 'bg-[#EF6D21] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >大港開唱</button>
                <button
                  onClick={() => handleFestivalChange('wild')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentFestival === 'wild'
                      ? 'bg-[#EF6D21] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >野人祭</button>
              </div>
              <StageFilter
                stages={stages}
                selectedStages={selectedStages}
                onToggle={handleStageToggle}
              />
            </div>

            {/* 團隊選擇 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 overflow-auto">
                {userTeams.length > 0 ? (
                  userTeams.map(team => (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedTeamId === team.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {team.name}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">你尚未加入任何團隊</p>
                )}
              </div>
              <button
                onClick={() => setShowJoinModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                加入團隊
              </button>
            </div>
          </div>
        </div>

        {/* 加入團隊 Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-xl font-bold mb-4">選擇要加入的團隊</h2>
              <ul className="space-y-2 mb-4">
                {availableTeams.map(team => (
                  <li key={team.id}>
                    <button
                      onClick={() => handleJoinTeam(team)}
                      className="w-full text-left px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      {team.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowJoinModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 表格區（仿 PersonalSchedule：上下左右捲動只在這裡） */}
        <div className="flex-1">
          <div className="w-full max-w-full md:max-w-[80%] mx-auto">
            <div className="overflow-auto max-h-[calc(100vh-250px)] pb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-30 bg-white p-2 min-w-[80px] text-sm">
                      時間
                    </th>
                    {stages
                      .filter(s => selectedStages.includes(s.id))
                      .map(stage => (
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
                    performances={filteredPerformances}
                    stages={stages.filter(s => selectedStages.includes(s.id))}
                    isTeamView
                    date={currentDate}
                    selectedPerformances={selectedPerformances}
                    onPerformanceToggle={handlePerformanceToggle}
                    selectedTeamId={selectedTeamId}
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
