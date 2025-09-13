
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { WorkoutResult } from '../../types';

interface RhythmDot {
  id: number;
  position: number;
}

const TARGET_ZONE_TOP = 85;
const TARGET_ZONE_HEIGHT = 10;

const Treadmill: React.FC<{ onFinish: (result: WorkoutResult) => void }> = ({ onFinish }) => {
  const [dots, setDots] = useState<RhythmDot[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(60);
  
  // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
  const gameInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnDot = useCallback(() => {
    setDots(prevDots => [...prevDots, { id: Date.now(), position: 0 }]);
  }, []);

  useEffect(() => {
    gameInterval.current = setInterval(() => {
        const shouldSpawn = Math.random() > 0.6;
        if(shouldSpawn) spawnDot();
        setDots(prevDots =>
            prevDots
                .map(dot => ({ ...dot, position: dot.position + 2.5 }))
                .filter(dot => dot.position < 110)
        );
    }, 100);
    
    timerInterval.current = setInterval(() => {
        setTimer(t => t - 1);
    }, 1000);

    return () => {
        if(gameInterval.current) clearInterval(gameInterval.current);
        if(timerInterval.current) clearInterval(timerInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      if(gameInterval.current) clearInterval(gameInterval.current);
      if(timerInterval.current) clearInterval(timerInterval.current);
      
      const caloriesBurned = Math.round(score / 10);
      onFinish({
        equipmentId: 'treadmill',
        caloriesBurned: caloriesBurned,
        muscleGains: { legs: Math.round(maxCombo / 10), core: Math.round(maxCombo / 20) },
        personalRecord: score
      });
    }
  }, [timer, score, maxCombo, onFinish]);

  const showFeedback = (text: string) => {
    setFeedback(text);
    setTimeout(() => setFeedback(''), 500);
  };

  const handleStep = () => {
    let hit = false;
    dots.forEach(dot => {
      const top = dot.position;
      if (top > TARGET_ZONE_TOP - 5 && top < TARGET_ZONE_TOP + TARGET_ZONE_HEIGHT + 5) {
        if (top > TARGET_ZONE_TOP && top < TARGET_ZONE_TOP + TARGET_ZONE_HEIGHT) {
          showFeedback('Perfect!');
          setScore(s => s + 100 * (1 + combo * 0.1));
          setCombo(c => c + 1);
        } else {
          showFeedback('Good');
          setScore(s => s + 50);
          setCombo(c => c + 1);
        }
        hit = true;
        setDots(d => d.filter(d => d.id !== dot.id));
      }
    });

    if (!hit) {
      showFeedback('Miss!');
      if(combo > maxCombo) setMaxCombo(combo);
      setCombo(0);
    } else {
        if (combo + 1 > maxCombo) setMaxCombo(combo + 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-lg flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-4">
        <div>
            <p className="text-lg">Score: <span className="font-bold text-indigo-400">{Math.round(score)}</span></p>
            <p className="text-lg">Combo: <span className="font-bold text-green-400">{combo}x</span></p>
        </div>
        <div className="text-4xl font-bold text-red-500">{timer}s</div>
      </div>
      <div className="relative w-48 h-96 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-600">
        {dots.map(dot => (
          <div key={dot.id} className="absolute w-12 h-4 bg-cyan-400 rounded-full left-1/2 -translate-x-1/2" style={{ top: `${dot.position}%` }}/>
        ))}
        <div className="absolute w-full h-1 bg-green-500/50" style={{top: `${TARGET_ZONE_TOP}%`}}></div>
        <div className="absolute w-full h-1 bg-green-500/50" style={{top: `${TARGET_ZONE_TOP + TARGET_ZONE_HEIGHT}%`}}></div>
        <div className="absolute w-full bg-green-500/20" style={{ top: `${TARGET_ZONE_TOP}%`, height: `${TARGET_ZONE_HEIGHT}%` }} />
        {feedback && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white animate-ping">{feedback}</div>}
      </div>
      <button onClick={handleStep} className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-lg text-xl">
        Step
      </button>
    </div>
  );
};

export default Treadmill;
