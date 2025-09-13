
import React from 'react';
import type { MuscleGroups } from '../types';
import { DumbbellIcon } from './icons/WorkoutIcons';

interface StatsPanelProps {
  muscleGroups: MuscleGroups;
}

const MuscleStat: React.FC<{ name: string; value: number }> = ({ name, value }) => {
    const width = `${value}%`;
    return (
        <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-sm font-bold text-indigo-300">{value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: width }}
                ></div>
            </div>
        </div>
    );
}

const StatsPanel: React.FC<StatsPanelProps> = ({ muscleGroups }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="flex items-center text-xl font-bold mb-4 text-indigo-300">
        <DumbbellIcon className="w-6 h-6 mr-2" />
        Muscle Balance
      </h3>
      <div>
        {Object.entries(muscleGroups).map(([name, value]) => (
          <MuscleStat key={name} name={name.charAt(0).toUpperCase() + name.slice(1)} value={value} />
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
