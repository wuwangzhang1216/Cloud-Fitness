import React from 'react';
import type { PlayerStats } from '../types';
import { FireIcon, StarIcon } from './icons/StatIcons';

interface StatsPanelProps {
  playerStats: PlayerStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ playerStats }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center">
        <FireIcon className="w-6 h-6 mr-3 text-red-400" />
        <div>
          <p className="text-sm text-gray-400">Calories Burned</p>
          <p className="text-lg font-bold text-white">{playerStats.caloriesBurned.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center">
        <StarIcon className="w-6 h-6 mr-3 text-yellow-400" />
        <div>
          <p className="text-sm text-gray-400">Stamina</p>
          <p className="text-lg font-bold text-white">{playerStats.stamina.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
