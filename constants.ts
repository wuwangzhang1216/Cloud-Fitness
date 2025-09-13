
import { PlayerStats, Equipment, EquipmentType } from './types';
import { TreadmillIcon, BenchPressIcon, SquatRackIcon, DumbbellIcon, RowingMachineIcon } from './components/icons/WorkoutIcons';

export const INITIAL_PLAYER_STATS: PlayerStats = {
  level: 1,
  xp: 0,
  caloriesBurned: 0,
  muscleGroups: {
    chest: 10,
    back: 8,
    legs: 12,
    arms: 7,
    shoulders: 9,
    core: 11,
  },
  personalRecords: {},
};

export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: 'treadmill',
    name: 'Treadmill',
    type: EquipmentType.Cardio,
    description: 'Improve stamina and burn calories with a rhythm-based running game.',
    primaryMuscles: ['legs', 'core'],
    icon: TreadmillIcon,
  },
  {
    id: 'benchPress',
    name: 'Bench Press',
    type: EquipmentType.Strength,
    description: 'Build upper body strength with this classic chest exercise.',
    primaryMuscles: ['chest', 'shoulders', 'arms'],
    icon: BenchPressIcon,
  },
  {
    id: 'squatRack',
    name: 'Squat Rack',
    type: EquipmentType.Strength,
    description: 'Develop powerful legs and a strong core. (Coming Soon)',
    primaryMuscles: ['legs', 'core', 'back'],
    icon: SquatRackIcon,
  },
  {
      id: 'dumbbellRack',
      name: 'Dumbbell Rack',
      type: EquipmentType.Strength,
      description: 'Versatile free weights for a variety of exercises. (Coming Soon)',
      primaryMuscles: ['arms', 'shoulders', 'chest', 'back'],
      icon: DumbbellIcon,
  },
  {
      id: 'rowingMachine',
      name: 'Rowing Machine',
      type: EquipmentType.Cardio,
      description: 'A full-body cardio workout that also builds back strength. (Coming Soon)',
      primaryMuscles: ['back', 'legs', 'core', 'arms'],
      icon: RowingMachineIcon,
  }
];
