import React from 'react';
import type { PlayerStats } from '../types';
import AvatarCard from './AvatarCard';
import StatsPanel from './StatsPanel';
import AiCoachPanel from './AiCoachPanel';
import BodyCompositionChart from './BodyCompositionChart';

interface DashboardProps {
  playerStats: PlayerStats;
}

const Dashboard: React.FC<DashboardProps> = ({ playerStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <AvatarCard playerStats={playerStats} />
        <StatsPanel playerStats={playerStats} />
        <AiCoachPanel playerStats={playerStats} />
      </div>
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-4 text-indigo-300">Body Composition</h3>
        <div className="w-full h-full max-h-96">
            <BodyCompositionChart data={playerStats.muscleGroups} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
