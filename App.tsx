
import React, { useState, useCallback, useMemo } from 'react';
import { PlayerStats, Equipment, WorkoutResult } from './types';
import { INITIAL_PLAYER_STATS, EQUIPMENT_LIST } from './constants';
import Dashboard from './components/Dashboard';
import WorkoutView from './components/WorkoutView';

const App: React.FC = () => {
  const [playerStats, setPlayerStats] = useState<PlayerStats>(INITIAL_PLAYER_STATS);
  const [activeWorkout, setActiveWorkout] = useState<Equipment | null>(null);

  const handleSelectWorkout = useCallback((equipment: Equipment) => {
    setActiveWorkout(equipment);
  }, []);

  const handleEndWorkout = useCallback((result: WorkoutResult | null) => {
    if (result) {
      setPlayerStats(prevStats => {
        const newStats = { ...prevStats };
        newStats.caloriesBurned += result.caloriesBurned;
        
        // Update muscle stats
        for (const muscle in result.muscleGains) {
          const key = muscle as keyof typeof newStats.muscleGroups;
          newStats.muscleGroups[key] = Math.min(100, newStats.muscleGroups[key] + result.muscleGains[key]!);
        }
        
        // Update PRs
        if (result.personalRecord) {
          const currentPR = newStats.personalRecords[result.equipmentId] || 0;
          if (result.personalRecord > currentPR) {
            newStats.personalRecords[result.equipmentId] = result.personalRecord;
          }
        }
        
        return newStats;
      });
    }
    setActiveWorkout(null);
  }, []);

  const memoizedPlayerStats = useMemo(() => playerStats, [playerStats]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 tracking-wider" style={{textShadow: '0 0 10px #818cf8'}}>
          Cloud Fitness Game
        </h1>
        <p className="text-gray-400 mt-2">Your virtual gym for real gains</p>
      </header>
      <main className="max-w-7xl mx-auto">
        {activeWorkout ? (
          <WorkoutView equipment={activeWorkout} onEndWorkout={handleEndWorkout} />
        ) : (
          <Dashboard
            playerStats={memoizedPlayerStats}
            equipmentList={EQUIPMENT_LIST}
            onSelectWorkout={handleSelectWorkout}
          />
        )}
      </main>
    </div>
  );
};

export default App;
