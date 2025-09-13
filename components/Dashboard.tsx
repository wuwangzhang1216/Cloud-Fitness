
import React from 'react';
import type { PlayerStats, Equipment } from '../types';
import AvatarCard from './AvatarCard';
import StatsPanel from './StatsPanel';
import AiCoachPanel from './AiCoachPanel';
import EquipmentCard from './EquipmentCard';

interface DashboardProps {
  playerStats: PlayerStats;
  equipmentList: Equipment[];
  onSelectWorkout: (equipment: Equipment) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ playerStats, equipmentList, onSelectWorkout }) => {
  const strengthEquipment = equipmentList.filter(e => e.name.includes('Soon'));
  const availableEquipment = equipmentList.filter(e => !e.name.includes('Soon'));


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-6">
        <AvatarCard level={playerStats.level} caloriesBurned={playerStats.caloriesBurned} />
        <StatsPanel muscleGroups={playerStats.muscleGroups} />
        <AiCoachPanel playerStats={playerStats} />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">Choose Your Workout</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableEquipment.map(equipment => (
              <EquipmentCard key={equipment.id} equipment={equipment} onSelect={onSelectWorkout} />
            ))}
            {strengthEquipment.map(equipment => (
              <EquipmentCard key={equipment.id} equipment={equipment} onSelect={() => {}} disabled={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
