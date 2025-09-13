
import React, { useState, useCallback } from 'react';
import { getWorkoutTip } from '../services/geminiService';
import type { PlayerStats } from '../types';
import { BrainCircuitIcon } from './icons/StatIcons';

interface AiCoachPanelProps {
  playerStats: PlayerStats;
}

const AiCoachPanel: React.FC<AiCoachPanelProps> = ({ playerStats }) => {
  const [tip, setTip] = useState<string>("Ready for a tip? Let's see how we can optimize your workout!");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetTip = useCallback(async () => {
    setIsLoading(true);
    const newTip = await getWorkoutTip(playerStats);
    setTip(newTip);
    setIsLoading(false);
  }, [playerStats]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="flex items-center text-xl font-bold mb-4 text-indigo-300">
        <BrainCircuitIcon className="w-6 h-6 mr-2" />
        AI Coach
      </h3>
      <div className="bg-gray-900/50 p-4 rounded-md min-h-[100px] flex items-center justify-center text-center italic text-gray-300 mb-4">
        {isLoading ? (
          <div className="animate-pulse">Analyzing stats...</div>
        ) : (
          <p>"{tip}"</p>
        )}
      </div>
      <button
        onClick={handleGetTip}
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Thinking...' : 'Get New Tip'}
      </button>
    </div>
  );
};

export default AiCoachPanel;
