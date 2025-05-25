import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ScheduleTable from '../components/ScheduleTable';
import StageFilter from '../components/StageFilter';
import { getPerformancesByFestivalAndDate } from '../data/performances';
import { megaportStages, wildSeasonStages } from '../data/stages';

function TeamSchedule() {
  // 狀態管理
  const [currentFestival, setCurrentFestival] = useState('megaport');
  const [currentDate, setCurrentDate] = useState('2025-03-29');
  const [stages, setStages] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedPerformances, setSelectedPerformances] = useState(new Set());
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  // 可加入的靜態團隊
  const availableTeams = [
    { id: 'teamX', name: '團隊 X' },
    { id: 'teamY', name: '團隊 Y' },
    { id: 'teamZ', name: '團隊 Z' },
  ];

  // 音樂祭日期對應
  const festivalDates = {
    megaport: ['2025-3-29', '2025-3-30'],
    wild: ['2025-4-26', '2025-4-27'],
  };

  // 初始化或當切換音樂祭／日期時載入資料
  useEffect(() => {
    const newStages =
      currentFestival === 'megaport' ? megaportStages : wildSeasonStages;
    setStages(newStages);
    setSelectedStages(newStages.map((s) => s.id));

    const list = getPerformancesByFestivalAndDate(
      currentFestival,
      currentDate
    );
    setPerformances(list);
    setSelectedPerformances(new Set());
  }, [currentFestival, currentDate]);

  // 處理舞台篩選切換
  const handleStageToggle = (stageId) => {
    setSelectedStages((prev) =>
      prev.includes(stageId)
        ? prev.filter((id) => id !== stageId)
        : [...prev, stageId]
    );
  };

  // 處理節目選擇（團隊或個人共用行為）
  const handlePerformanceToggle = (performanceId) => {
    setSelectedPerformances((prev) => {
      const next = new Set(prev);
      next.has(performanceId)
        ? next.delete(performanceId)
        : next.add(performanceId);
      return next;
    });
  };

  // 切換音樂祭
  const handleFestivalChange = (festival) => {
    setCurrentFestival(festival);
    // 切換後預設選取該音樂祭的第一天
    setCurrentDate(festivalDates[festival][0]);
  };

  // 切換日期
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  // 加入團隊
  const handleJoinTeam = (team) => {
    if (!userTeams.find((t) => t.id === team.id)) {
      setUserTeams((prev) => [...prev, team]);
      setSelectedTeamId(team.id);
    }
    setShowJoinModal(false);
  };

  // 篩選後的舞台
  const filteredStages = stages.filter((s) =>
    selectedStages.includes(s.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu />

      {/* 主區容器，預留 Header */}
      <div className="flex-1 flex flex-col pt-16">
        {/* 控制區 (sticky) */}
        <div className="sticky top-0 bg-white z-30 w-full border-b">
          <div className="w-full p-4 max-w-full md:max-w-[80%] mx-auto">
            <div className="flex flex-col gap-4">

              {/* 日期切換 */}
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">團隊行程</h1>
                <div className="flex gap-2">
                  {festivalDates[currentFestival].map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDateChange(d)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
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

              {/* 音樂祭與舞台選擇 */}
              <div className="flex items-center gap-4">
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
                    野人祭
                  </button>
                </div>
                <StageFilter
                  stages={stages}
                  selectedStages={selectedStages}
                  onToggle={handleStageToggle}
                />
              </div>

              {/* 團隊選擇 */}
              <div className="flex items-center justify-between">
                <div>
                  {userTeams.length > 0 ? (
                    <div className="flex gap-2">
                      {userTeams.map((team) => (
                        <button
                          key={team.id}
                          onClick={() => setSelectedTeamId(team.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedTeamId === team.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {team.name}
                        </button>
                      ))}
                    </div>
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
        </div>

        {/* 加入團隊彈窗 */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-xl font-bold mb-4">選擇要加入的團隊</h2>
              <ul className="space-y-2 mb-4">
                {availableTeams.map((team) => (
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

        {/* 表格顯示區 */}
        <div className="flex-1">
          <div className="w-full max-w-full md:max-w-[80%] mx-auto">
            <div className="overflow-auto max-h-[calc(100vh-200px)] pb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-30 bg-white p-2 min-w-[80px] text-sm">
                      時間
                    </th>
                    {filteredStages.map((stage) => (
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
                    performances={performances}
                    stages={filteredStages}
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

export default TeamSchedule;
