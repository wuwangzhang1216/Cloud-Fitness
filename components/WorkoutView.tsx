import React, { useState, useCallback } from 'react';
import { Equipment, WorkoutResult } from '../types';
import Treadmill from './workouts/Treadmill';
import BenchPress from './workouts/BenchPress';
import Equipment3DView from './Equipment3DView';
import CharacterAnimation from './CharacterAnimation';

interface WorkoutViewProps {
  equipment: Equipment;
  onEndWorkout: (result: WorkoutResult | null) => void;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ equipment, onEndWorkout }) => {
  const [activeMuscles, setActiveMuscles] = useState<Set<string>>(new Set());
  const [repProgress, setRepProgress] = useState(0); // 0 to 1
  const [cameraAngle, setCameraAngle] = useState(0);

  const handleMusclePulse = useCallback((muscles: (keyof Equipment['primaryMuscles'] | string)[]) => {
    setActiveMuscles(prev => {
      const newSet = new Set(prev);
      muscles.forEach(m => newSet.add(m.toString()));
      return newSet;
    });
    // Remove after animation
    setTimeout(() => {
        setActiveMuscles(prev => {
            const newSet = new Set(prev);
            muscles.forEach(m => newSet.delete(m.toString()));
            return newSet;
        });
    }, 500);
  }, []);

  const renderWorkout = () => {
    switch (equipment.id) {
      case 'treadmill':
        return <Treadmill onFinish={onEndWorkout} onMusclePulse={handleMusclePulse} setCameraAngle={setCameraAngle} />;
      case 'benchPress':
        return <BenchPress onFinish={onEndWorkout} onMusclePulse={handleMusclePulse} setRepProgress={setRepProgress} setCameraAngle={setCameraAngle} />;
      default:
        return (
            <div className="text-center">
                <p className="text-2xl text-yellow-400">This workout is under construction!</p>
                <button onClick={() => onEndWorkout(null)} className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                    Back to Gym
                </button>
            </div>
        )
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm p-4 sm:p-8 flex flex-col items-center justify-center text-white overflow-hidden">
        <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-900 z-0"
        >
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-700/50 [transform:perspective(1000px)_rotateX(75deg)]"></div>
        </div>

        <div 
          className="absolute z-10 transition-transform duration-700 ease-in-out"
          style={{ 
            perspective: '2000px',
            transform: `translateZ(200px) rotateY(${cameraAngle}deg)`
          }}
        >
            <div className="relative" style={{transformStyle: 'preserve-3d'}}>
                <Equipment3DView equipmentId={equipment.id} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{transform: 'translateZ(50px)'}}>
                    <CharacterAnimation activeMuscles={activeMuscles} repProgress={repProgress} />
                </div>
            </div>
        </div>

        <div className="relative z-20 w-full max-w-4xl text-center mt-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-2">{equipment.name}</h2>
                {renderWorkout()}
            </div>
        </div>
    </div>
  );
};

export default WorkoutView;
