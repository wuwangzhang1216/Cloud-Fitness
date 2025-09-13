// FIX: Correctly import React hooks using curly braces.
import React, { useState, useCallback, useEffect } from 'react';
import { PlayerStats, Equipment, WorkoutResult } from './types';
import { INITIAL_PLAYER_STATS, EQUIPMENT_LIST, GYM_FLOORS, TILE_SIZE } from './constants';
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
        if (parsed.position && parsed.position.floor && parsed.stamina !== undefined) {
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


  const handleSelectWorkout = useCallback((equipmentId: string) => {
    const equipment = EQUIPMENT_LIST.find(e => e.id === equipmentId);
    if (!equipment) return;
    
    const floor = playerStats.position.floor as keyof typeof GYM_FLOORS;
    const mapWidth = (GYM_FLOORS[floor]?.[0]?.length ?? 30) * TILE_SIZE;
    const mapHeight = (GYM_FLOORS[floor]?.length ?? 20) * TILE_SIZE;

    // Center the transition on the player's sprite
    const originX = (playerStats.position.x * TILE_SIZE) / mapWidth * 100;
    const originY = (playerStats.position.y * TILE_SIZE) / mapHeight * 100;
    
    const originString = `${originX}% ${originY}%`;
    setTransitionOrigin(originString);
    setActiveWorkout(equipment);
    setSceneState('workout');
  }, [playerStats]);

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
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 overflow-hidden flex flex-col">
      <header className="text-center mb-4 relative z-20 flex-shrink-0">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 tracking-wider" style={{textShadow: '0 0 10px #818cf8'}}>
          Cloud Fitness Game
        </h1>
        <p className="text-gray-400 mt-2">Your virtual gym for real gains</p>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto relative" style={{ transformStyle: 'preserve-3d' }}>
        <div 
          className={`scene ${sceneState === 'gym' ? 'gym-view-active' : 'gym-view-inactive'}`}
          style={{ transformOrigin: transitionOrigin }}
          >
          <GymView
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
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