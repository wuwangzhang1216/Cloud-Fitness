import React, { useState, useEffect, useRef } from 'react';
import { WorkoutResult } from '../../types';

interface BenchPressProps {
  onFinish: (result: WorkoutResult) => void;
  onMusclePulse: (muscles: string[]) => void;
  setRepProgress: (progress: number) => void;
  setCameraAngle: React.Dispatch<React.SetStateAction<number>>;
}

type LiftState = 'ready' | 'lifting' | 'holding' | 'failed';

const BenchPress: React.FC<BenchPressProps> = ({ onFinish, onMusclePulse, setRepProgress, setCameraAngle }) => {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(50);
  const [liftState, setLiftState] = useState<LiftState>('ready');
  const [power, setPower] = useState(0);

  const liftIntervalRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    if (liftState === 'ready') {
      setLiftState('lifting');
      liftIntervalRef.current = window.setInterval(() => {
        setPower(p => Math.min(100, p + 5));
      }, 50);
    }
  };

  const handleMouseUp = () => {
    if (liftIntervalRef.current) clearInterval(liftIntervalRef.current);

    if (power > 40) { // Successful lift
      setReps(r => {
        const newReps = r + 1;
        if (newReps > 0 && newReps % 3 === 0) {
          setCameraAngle(a => a + (Math.random() > 0.5 ? 20 : -20));
        }
        return newReps;
      });
      onMusclePulse(['chest', 'arms', 'shoulders']);
    } else {
      setLiftState('failed');
    }
    
    setTimeout(() => {
        setLiftState('ready');
        setPower(0);
    }, 800);
  };
  
  useEffect(() => {
    if(liftState === 'lifting' || liftState === 'failed') {
        setRepProgress(power / 100);
    } else {
        setRepProgress(0);
    }
  }, [power, liftState, setRepProgress]);

  const handleFinishSet = () => {
    onFinish({
      equipmentId: 'benchPress',
      caloriesBurned: reps * 2 + Math.floor(weight / 10),
      muscleGains: {
        chest: reps * 0.5 + weight * 0.02,
        arms: reps * 0.2 + weight * 0.01,
        shoulders: reps * 0.3 + weight * 0.015,
      },
      personalRecord: reps > 0 ? weight : undefined,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-around items-center mb-6">
        <div>
          <p className="text-lg text-gray-400">Weight</p>
          <p className="text-3xl font-bold text-yellow-400">{weight} kg</p>
        </div>
        <div>
          <p className="text-lg text-gray-400">Reps</p>
          <p className="text-3xl font-bold text-indigo-400">{reps}</p>
        </div>
      </div>

      <div className="w-full max-w-md mb-6">
        <div className="h-8 w-full bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600">
            <div 
                className={`h-full rounded-full transition-all duration-150 ${liftState === 'failed' ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-blue-500'}`}
                style={{width: `${power}%`}}
            ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-400">
          {liftState === 'ready' && "Press and hold to lift"}
          {liftState === 'lifting' && "Keep going!"}
          {liftState === 'failed' && "Not enough power!"}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          disabled={liftState !== 'ready'}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-10 rounded-lg text-xl disabled:bg-gray-500 disabled:cursor-not-allowed select-none"
        >
          Lift!
        </button>
        <button
          onClick={handleFinishSet}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-lg text-xl"
        >
          Finish Set
        </button>
      </div>
    </div>
  );
};

export default BenchPress;
