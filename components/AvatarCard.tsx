import React from 'react';
import type { PlayerStats } from '../types';
import { UserIcon } from './icons/StatIcons';

interface AvatarCardProps {
  playerStats: PlayerStats;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ playerStats }) => {
  const currentFloorName = playerStats.position.floor.charAt(0).toUpperCase() + playerStats.position.floor.slice(1) + " Floor";

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700 flex items-center space-x-4">
      <div className="bg-indigo-500 p-3 rounded-full border-2 border-indigo-400">
        <UserIcon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">Player</h3>
        <p className="text-gray-400">Level: {playerStats.level}</p>
        <p className="text-sm text-indigo-300 font-semibold mt-1">{currentFloorName}</p>
      </div>
    </div>
  );
};

export default AvatarCard;