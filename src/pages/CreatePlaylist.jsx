import React from "react";
import Header from "../components/Header";

function CreatePlaylist() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showMenu={true} />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">創建個人歌單</h1>
        {/* Spotify integration will be added in the next iteration */}

        {/* 敬請期待 */}
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-base md:text-xl text-primary-600 font-medium">
            🎧 敬請期待
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
