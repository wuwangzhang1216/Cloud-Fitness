
// FIX: Import React type definitions to resolve 'Cannot find namespace 'React''.
import type React from 'react';

export interface MuscleGroups {
  chest: number;
  back: number;
  legs: number;
  arms: number;
  shoulders: number;
  core: number;
}

export interface PlayerStats {
  level: number;
  xp: number;
  caloriesBurned: number;
  muscleGroups: MuscleGroups;
  personalRecords: { [equipmentId: string]: number };
}

export enum EquipmentType {
  Cardio = 'Cardio',
  Strength = 'Strength',
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  description: string;
  primaryMuscles: (keyof MuscleGroups)[];
  icon: React.FC<{className?: string}>;
}

export interface WorkoutResult {
  equipmentId: string;
  caloriesBurned: number;
  muscleGains: Partial<MuscleGroups>;
  personalRecord?: number;
}
