import React from 'react';

export type MuscleGroup = 'chest' | 'back' | 'legs' | 'arms' | 'shoulders' | 'core';

export interface PlayerStats {
  level: number;
  stamina: number;
  caloriesBurned: number;
  position: { x: number; y: number };
  muscleGroups: {
    [key in MuscleGroup]: number;
  };
  personalRecords: {
    [equipmentId: string]: number;
  };
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  primaryMuscles: MuscleGroup[];
  minStamina: number;
}

export interface WorkoutResult {
  equipmentId: string;
  caloriesBurned: number;
  muscleGains: {
    [key in MuscleGroup]?: number;
  };
  personalRecord?: number;
}

export type PlayerDirection = 'down' | 'up' | 'left' | 'right';
