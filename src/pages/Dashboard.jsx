import React from 'react';
import Header from '../components/Header';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="flex-1 container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">歡迎回來</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}

export default Dashboard;