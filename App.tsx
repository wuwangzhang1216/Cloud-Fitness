// FIX: Correctly import React hooks using curly braces.
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
  const [sceneState, setSceneState] = useState<'gym' | 'workout'>('gym');
  const [transitionOrigin, setTransitionOrigin] = useState('50% 50%');

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(playerStats));
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  }, [playerStats]);


  const handleSelectWorkout = useCallback((equipment: Equipment, origin: {x: number, y: number}) => {
    const originString = `${origin.x}px ${origin.y}px`;
    setTransitionOrigin(originString);
    setActiveWorkout(equipment);
    setSceneState('workout');
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
        
        newStats.stamina = 100;

        return newStats;
      });
    }
    setSceneState('gym');
    // Allow transition to finish before clearing workout
    setTimeout(() => {
        setActiveWorkout(null);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <header className="text-center mb-8 relative z-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 tracking-wider" style={{textShadow: '0 0 10px #818cf8'}}>
          Cloud Fitness Game
        </h1>
        <p className="text-gray-400 mt-2">Your virtual gym for real gains</p>
      </header>
      <main className="max-w-7xl mx-auto relative h-[80vh]" style={{ transformStyle: 'preserve-3d' }}>
        <div 
          className={`scene ${sceneState === 'gym' ? 'gym-view-active' : 'gym-view-inactive'}`}
          style={{ transformOrigin: transitionOrigin }}
          >
          <GymView
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
            equipmentList={EQUIPMENT_LIST}
            onSelectWorkout={handleSelectWorkout}
          />
        </div>
        
        {activeWorkout && (
            <div 
            className={`scene ${sceneState === 'workout' ? 'workout-view-active' : 'workout-view-inactive'}`}
            style={{ transformOrigin: transitionOrigin }}
          >
            <WorkoutView equipment={activeWorkout} onEndWorkout={handleEndWorkout} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;