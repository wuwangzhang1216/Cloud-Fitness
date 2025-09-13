
import React from 'react';
import type { Equipment } from '../types';

interface EquipmentCardProps {
  equipment: Equipment;
  onSelect: (equipment: Equipment) => void;
  disabled?: boolean;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onSelect, disabled = false }) => {
  const Icon = equipment.icon;

  return (
    <div
      onClick={() => !disabled && onSelect(equipment)}
      className={`
        group bg-gray-800 p-5 rounded-lg border-2 border-gray-700
        transition-all duration-300 ease-in-out
        ${disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:border-indigo-500 hover:bg-gray-700/50 transform hover:-translate-y-1'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="bg-gray-900 p-3 rounded-lg border border-gray-600">
           <Icon className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{equipment.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{equipment.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
