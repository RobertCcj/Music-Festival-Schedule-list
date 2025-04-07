import React from 'react';
import Header from '../components/Header';

function TeamSchedule() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">團隊行程</h1>
        {/* Team schedule implementation will be added in the next iteration */}
      </div>
    </div>
  );
}

export default TeamSchedule;