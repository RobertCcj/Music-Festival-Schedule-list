import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ScheduleTable from '../components/ScheduleTable';
import StageFilter from '../components/StageFilter';
import { getPerformancesByFestivalAndDate } from '../data/performances';
import { megaportStages } from '../data/stages';

function TeamSchedule() {
  const [date] = useState('2025-03-29');
  const [performances, setPerformances] = useState([]);
  const [stages, setStages] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedPerformances, setSelectedPerformances] = useState(new Set());
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  const availableTeams = [
    { id: 'teamX', name: '團隊 X' },
    { id: 'teamY', name: '團隊 Y' },
    { id: 'teamZ', name: '團隊 Z' },
  ];

  useEffect(() => {
    setStages(megaportStages);
    setPerformances(getPerformancesByFestivalAndDate('megaport', date));
    setSelectedStages(megaportStages.map(stage => stage.id));
    setUserTeams([]);
  }, [date]);

  const handleStageToggle = (stageId) => {
    setSelectedStages(prev =>
      prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]
    );
  };

  const handlePerformanceToggle = (performance) => {
    setSelectedPerformances(prev => {
      const next = new Set(prev);
      if (next.has(performance.id)) {
        next.delete(performance.id);
      } else {
        next.add(performance.id);
      }
      return next;
    });
  };

  const handleJoinTeam = (team) => {
    setUserTeams(prev => [...prev, team]);
    setSelectedTeamId(team.id);
    setShowJoinModal(false);
  };

  const filteredStages = stages.filter(stage => selectedStages.includes(stage.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu />

      {/* 團隊選擇區 */}
      <div className="sticky top-16 bg-white z-20 border-b">
        <div className="max-w-full md:max-w-[80%] mx-auto p-4 flex items-center justify-between">
          <div>
            {userTeams.length > 0 ? (
              <div className="flex space-x-2">
                {userTeams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                    className={`px-4 py-2 rounded ${team.id === selectedTeamId ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
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
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            加入團隊
          </button>
        </div>
      </div>

      {/* 加入團隊彈窗 */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
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
              className="mt-2 px-4 py-2 bg-gray-300 rounded"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 篩選與表格區 */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <div className="max-w-full md:max-w-[80%] mx-auto">
          <StageFilter
            stages={stages}
            selectedStages={selectedStages}
            onToggle={handleStageToggle}
          />
          <div className="flex-1">
            <div className="w-full max-w-full md:max-w-[80%] mx-auto">
              <div className="overflow-auto max-h-[calc(100vh-200px)] pb-4">
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
                      performances={performances}
                      stages={filteredStages}
                      isTeamView
                      date={date}
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
    </div>
  );
}

export default TeamSchedule;
