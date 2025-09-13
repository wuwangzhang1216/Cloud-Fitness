
import React from 'react';
import { UserIcon, FireIcon, StarIcon } from './icons/StatIcons';

interface AvatarCardProps {
  level: number;
  caloriesBurned: number;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ level, caloriesBurned }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50"></div>
        <img src={`https://picsum.photos/seed/${level}/200`} alt="Player Avatar" className="relative w-32 h-32 rounded-full border-4 border-indigo-400 object-cover shadow-md" />
      </div>
      <h2 className="text-2xl font-bold">Fitness Warrior</h2>
      <div className="flex justify-center items-center gap-6 mt-4 text-gray-300">
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span>Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <FireIcon className="w-5 h-5 text-red-500" />
          <span>{caloriesBurned.toLocaleString()} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
