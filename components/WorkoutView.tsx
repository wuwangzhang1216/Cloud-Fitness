
import React from 'react';
import type { Equipment, WorkoutResult } from '../types';
import Treadmill from './workouts/Treadmill';
import BenchPress from './workouts/BenchPress';

interface WorkoutViewProps {
  equipment: Equipment;
  onEndWorkout: (result: WorkoutResult | null) => void;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ equipment, onEndWorkout }) => {
  const renderWorkout = () => {
    switch (equipment.id) {
      case 'treadmill':
        return <Treadmill onFinish={onEndWorkout} />;
      case 'benchPress':
        return <BenchPress onFinish={onEndWorkout} />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold">Workout Not Implemented</h2>
            <p className="text-gray-400 mt-2">This piece of equipment is not ready yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-indigo-300">{equipment.name}</h2>
        <button
          onClick={() => onEndWorkout(null)}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          End Workout
        </button>
      </div>
      {renderWorkout()}
    </div>
  );
};

export default WorkoutView;
