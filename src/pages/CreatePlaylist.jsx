import React from 'react';
import Header from '../components/Header';

function CreatePlaylist() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">創建個人歌單</h1>
        {/* Spotify integration will be added in the next iteration */}
      </div>
    </div>
  );
}

export default CreatePlaylist;