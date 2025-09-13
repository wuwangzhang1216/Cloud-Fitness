import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutResult } from '../../types';

interface TreadmillProps {
  onFinish: (result: WorkoutResult) => void;
  onMusclePulse: (muscles: string[]) => void;
  setCameraAngle: React.Dispatch<React.SetStateAction<number>>;
}

interface Note {
  id: number;
  position: number;
}

const Treadmill: React.FC<TreadmillProps> = ({ onFinish, onMusclePulse, setCameraAngle }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [notes, setNotes] = useState<Note[]>([]);
  const [combo, setCombo] = useState(0);

  const handleFinish = useCallback(() => {
    onFinish({
      equipmentId: 'treadmill',
      caloriesBurned: Math.floor(score / 10),
      muscleGains: {
        legs: Math.floor(score / 500),
        core: Math.floor(score / 1000),
      },
      personalRecord: score,
    });
  }, [score, onFinish]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
      // Move existing notes
      setNotes(prev => prev.map(note => ({ ...note, position: note.position - 10 })).filter(note => note.position > -10));
    }, 1000);

    const noteGenerator = setInterval(() => {
        if (Math.random() > 0.4) { // % chance to spawn a note
             setNotes(prev => [...prev, { id: Date.now(), position: 100 }]);
        }
    }, 500);

    return () => {
        clearInterval(timer);
        clearInterval(noteGenerator);
    };
  }, [timeLeft, handleFinish]);

  useEffect(() => {
    if (combo > 0 && combo % 10 === 0) {
        setCameraAngle(a => a + (Math.random() > 0.5 ? 15 : -15));
    }
  }, [combo, setCameraAngle]);

  const handleStep = () => {
    let hit = false;
    notes.forEach(note => {
      if (note.position < 20 && note.position > -5) { // Hit zone
        setScore(s => s + 100 + combo * 10);
        setCombo(c => c + 1);
        setNotes(n => n.filter(n => n.id !== note.id));
        onMusclePulse(['legs', 'core']);
        hit = true;
      }
    });
    if (!hit) {
      setCombo(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <div className="text-left">
            <p className="text-lg text-gray-400">Score</p>
            <p className="text-3xl font-bold text-indigo-400">{score.toLocaleString()}</p>
        </div>
        <div className="text-center">
            <p className="text-lg text-gray-400">Combo</p>
            <p className="text-3xl font-bold text-yellow-400">x{combo}</p>
        </div>
        <div className="text-right">
            <p className="text-lg text-gray-400">Time Left</p>
            <p className="text-3xl font-bold text-green-400">{timeLeft}s</p>
        </div>
      </div>
      
      <div className="relative w-full h-16 bg-gray-900/50 rounded-lg overflow-hidden border-2 border-gray-700 mb-4">
        {/* Track */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-600"></div>
        {/* Hit Zone */}
        <div className="absolute left-0 top-0 h-full w-1/6 bg-green-500/20 border-r-4 border-green-400"></div>
        
        {notes.map(note => (
          <div key={note.id} 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-indigo-400 rounded transition-all duration-1000 linear"
            style={{ left: `${note.position}%`}}
            />
        ))}
      </div>

      <button
        onClick={handleStep}
        disabled={timeLeft === 0}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-xl disabled:bg-gray-500 w-full max-w-xs"
      >
        Step!
      </button>
    </div>
  );
};

export default Treadmill;
