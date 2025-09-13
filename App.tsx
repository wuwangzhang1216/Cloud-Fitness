import React, { useState, useCallback, useEffect } from 'react';
import { PlayerStats, Equipment, WorkoutResult } from './types';
import { INITIAL_PLAYER_STATS, EQUIPMENT_LIST } from './constants';
import GymView from './components/GymView';
import WorkoutView from './components/WorkoutView';

const SAVE_KEY = 'cloud-fitness-game-save';

const App: React.FC = () => {
  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Basic validation to ensure saved data has the new structure
        if (parsed.position && parsed.stamina !== undefined) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load saved data:", error);
      localStorage.removeItem(SAVE_KEY);
    }
    return INITIAL_PLAYER_STATS;
  });

  const [activeWorkout, setActiveWorkout] = useState<Equipment | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(playerStats));
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  }, [playerStats]);


  const handleSelectWorkout = useCallback((equipment: Equipment) => {
    setActiveWorkout(equipment);
  }, []);

  const handleEndWorkout = useCallback((result: WorkoutResult | null) => {
    if (result) {
      setPlayerStats(prevStats => {
        const newStats = { ...prevStats };
        newStats.caloriesBurned += result.caloriesBurned;
        
        for (const muscle in result.muscleGains) {
          const key = muscle as keyof typeof newStats.muscleGroups;
          newStats.muscleGroups[key] = Math.min(100, newStats.muscleGroups[key] + result.muscleGains[key]!);
        }
        
        if (result.personalRecord) {
          const currentPR = newStats.personalRecords[result.equipmentId] || 0;
          if (result.personalRecord > currentPR) {
            newStats.personalRecords[result.equipmentId] = result.personalRecord;
          }
        }
        
        // Refill stamina after a workout
        newStats.stamina = 100;

        return newStats;
      });
    }
    setActiveWorkout(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
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
          <GymView
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
            equipmentList={EQUIPMENT_LIST}
            onSelectWorkout={handleSelectWorkout}
          />
        )}
      </main>
    </div>
  );
};

export default App;