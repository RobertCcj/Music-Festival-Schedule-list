import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ScheduleTable from '../components/ScheduleTable';
import {
  fetchTeamSchedule,
  fetchTeamMembers,
  fetchPerformances,
  fetchStages,
} from '../api/teamApi';

function TeamSchedule() {
  // 團隊相關狀態：尚未加入/創建團隊時，顯示選擇面板
  const [inTeam, setInTeam] = useState(false);
  const [teamName, setTeamName] = useState('');

  // 行程資料狀態
  const [performances, setPerformances] = useState([]);
  const [stages, setStages] = useState([]);
  const [teamVotes, setTeamVotes] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedPerformances, setSelectedPerformances] = useState(new Set());
  const [date, setDate] = useState('2025-03-29');

  useEffect(() => {
    fetchPerformances()
      .then((res) => setPerformances(Array.isArray(res) ? res : []))
      .catch(() => {
        console.warn('後端尚未提供 /api/performances，使用假資料');
        setPerformances([
          {
            id: 'test1',
            name: '測試樂團',
            startTime: '14:00',
            endTime: '15:00',
            date: '2025-03-29',
            stageId: 'big-maru',
          },
        ]);
      });

    fetchStages()
      .then((res) => setStages(Array.isArray(res) ? res : []))
      .catch(() => {
        console.warn('後端尚未提供 /api/stages，使用假資料');
        setStages([{ id: 'big-maru', name: '大雄丸', color: 'bg-red-500' }]);
      });

    fetchTeamMembers()
      .then((data) => {
        if (Array.isArray(data)) {
          setTeamMembers(data);
        } else {
          throw new Error('teamMembers 不是陣列');
        }
      })
      .catch(() => {
        console.warn('後端尚未提供 /api/team/members，使用假資料');
        setTeamMembers([
          { id: 'user1', name: '小明' },
          { id: 'user2', name: '小美' },
        ]);
      });

    fetchTeamSchedule()
      .then(setTeamVotes)
      .catch(() => {
        console.warn('後端尚未提供 /api/team/schedule，使用假資料');
        setTeamVotes({ test1: 2 });
      });
  }, []);

  // 加入團隊 / 創建團隊的處理
  const handleJoinTeam = () => {
    // 此處可加入 API 呼叫以加入現有團隊
    setInTeam(true);
  };

  const handleCreateTeam = () => {
    // 此處可加入 API 呼叫以創建團隊，並傳入 teamName
    if (teamName.trim() !== '') {
      setInTeam(true);
    } else {
      alert('請輸入團隊名稱');
    }
  };

  // 控制區右側團隊操作介面
  const renderTeamControls = () => (
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
        加入團隊成員
      </button>
      <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
        創建團隊
      </button>
    </div>
  );

  // 若尚未加入團隊，顯示選擇面板（全螢幕覆蓋）
  if (!inTeam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* 修正：Header 改為 showMenu=true 表示登入狀態 */}
        <Header showMenu={true} />
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">團隊選擇</h1>
          <p className="mb-4">請選擇加入現有團隊或創建新的團隊：</p>
          <div className="flex gap-4">
            <button
              onClick={handleJoinTeam}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              加入團隊
            </button>
            <button
              onClick={handleCreateTeam}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              創建團隊
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="輸入團隊名稱"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="flex-1 flex flex-col pt-16">
        {/* 控制區 */}
        <div className="sticky top-0 bg-white z-30 w-full border-b">
          <div className="w-full p-4 max-w-full md:max-w-[80%] mx-auto flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">團隊行程</h1>
              {/* 可依需求增加日期切換等其他過濾條件 */}
            </div>
            {/* 右側團隊控制 */}
            {renderTeamControls()}
          </div>
        </div>

        {/* 主要內容：節目表 */}
        <div className="flex-1">
          <div className="w-full max-w-full md:max-w-[80%] mx-auto">
            <div className="overflow-auto max-h-[calc(100vh-200px)] pb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-30 bg-white p-2 min-w-[80px] text-sm">
                      時間
                    </th>
                    {stages.map((stage) => (
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
                    stages={stages}
                    teamVotes={teamVotes}
                    isTeamView={true}
                    selectedPerformances={selectedPerformances}
                    onPerformanceToggle={() => {}}
                    date={date}
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
