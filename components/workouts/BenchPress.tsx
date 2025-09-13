
import React, { useState, useEffect, useRef } from 'react';
import type { WorkoutResult } from '../../types';

type RepPhase = 'start' | 'down' | 'up' | 'complete';

const BenchPress: React.FC<{ onFinish: (result: WorkoutResult) => void }> = ({ onFinish }) => {
  const [weight, setWeight] = useState(40); // in kg
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState<RepPhase>('start');
  const [progress, setProgress] = useState(0); // 0 to 100
  const [feedback, setFeedback] = useState('Select weight and start your set!');
  const [timer, setTimer] = useState(90);

  const pressStartTime = useRef<number | null>(null);
  // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
        setTimer(t => t - 1);
    }, 1000);

    return () => {
        if(timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      if(timerInterval.current) clearInterval(timerInterval.current);
      const totalVolume = weight * reps;
      onFinish({
        equipmentId: 'benchPress',
        caloriesBurned: Math.round(totalVolume / 20),
        muscleGains: { 
          chest: Math.round(totalVolume / 100), 
          shoulders: Math.round(totalVolume / 200), 
          arms: Math.round(totalVolume / 150) 
        },
        personalRecord: reps > 4 ? weight : 0
      });
    }
  }, [timer, weight, reps, onFinish]);


  const handlePressDown = () => {
    if (phase === 'start' || phase === 'complete') {
      setPhase('down');
      pressStartTime.current = Date.now();
      setFeedback('Control the descent...');
    }
  };

  const handlePressUp = () => {
    if (phase === 'down') {
      const duration = Date.now() - (pressStartTime.current || Date.now());
      if (duration < 1000) {
        setFeedback('Too fast! Control it!');
        setPhase('start');
      } else {
        setFeedback('Push!');
        setPhase('up');
        // Simulate push strength based on weight
        const pushDuration = 500 + weight * 10;
        const interval = setInterval(() => {
            setProgress(p => {
                const newProgress = p - 10;
                if(newProgress <= 0) {
                    clearInterval(interval);
                    setReps(r => r + 1);
                    setPhase('complete');
                    setFeedback('Good rep!');
                    return 0;
                }
                return newProgress;
            });
        }, pushDuration / 10);
      }
    }
  };
  
  useEffect(() => {
      // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
      let interval: ReturnType<typeof setInterval>;
      if (phase === 'down') {
          interval = setInterval(() => {
              setProgress(p => {
                  if (p >= 100) {
                      clearInterval(interval);
                      return 100;
                  }
                  return p + 2;
              })
          }, 50);
      }
      return () => clearInterval(interval);
  }, [phase]);

  const changeWeight = (amount: number) => {
    if (reps > 0) return;
    setWeight(w => Math.max(20, w + amount));
  };
  
  return (
    <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-lg flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2">
                <button onClick={() => changeWeight(-5)} disabled={reps > 0} className="font-bold text-2xl bg-gray-700 px-3 rounded disabled:opacity-50">-</button>
                <p className="text-xl w-24 text-center">Weight: <span className="font-bold text-indigo-400">{weight}kg</span></p>
                <button onClick={() => changeWeight(5)} disabled={reps > 0} className="font-bold text-2xl bg-gray-700 px-3 rounded disabled:opacity-50">+</button>
            </div>
             <p className="text-xl">Reps: <span className="font-bold text-green-400">{reps}</span></p>
            <div className="text-4xl font-bold text-red-500">{timer}s</div>
        </div>
        
        <div className="w-full max-w-md my-6">
            <p className="text-center text-lg text-yellow-300 mb-2">{feedback}</p>
            <div className="h-10 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600">
                <div 
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-100"
                    style={{width: `${100 - progress}%`}}
                ></div>
            </div>
            <div className="flex justify-between text-sm px-2 mt-1">
                <span>Chest</span><span>Up</span>
            </div>
        </div>

      <button
        onMouseDown={handlePressDown}
        onMouseUp={handlePressUp}
        onTouchStart={handlePressDown}
        onTouchEnd={handlePressUp}
        className={`mt-4 text-white font-bold py-6 px-16 rounded-lg text-2xl transition-all select-none
        ${phase === 'down' ? 'bg-red-700 scale-95' : 'bg-green-600 hover:bg-green-500'}`}
      >
        {phase === 'down' ? 'Lowering...' : 'PRESS'}
      </button>
      <p className="mt-4 text-gray-400 text-sm">Hold to lower the bar, release to push.</p>
    </div>
  );
};

export default BenchPress;
