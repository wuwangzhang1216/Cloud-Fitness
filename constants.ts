import { PlayerStats, Equipment } from './types';
import {
  TreadmillIcon,
  BenchPressIcon,
  DumbbellIcon,
  SquatRackIcon,
  RowingMachineIcon,
} from './components/icons/WorkoutIcons';

export const INITIAL_PLAYER_STATS: PlayerStats = {
  level: 1,
  stamina: 100,
  caloriesBurned: 0,
  position: { x: 300, y: 300 },
  muscleGroups: {
    chest: 10,
    back: 10,
    legs: 10,
    arms: 10,
    shoulders: 10,
    core: 10,
  },
  personalRecords: {},
};

export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: 'treadmill',
    name: 'Treadmill',
    description: 'Cardio workout for stamina and legs.',
    icon: TreadmillIcon,
    primaryMuscles: ['legs', 'core'],
    minStamina: 20,
  },
  {
    id: 'benchPress',
    name: 'Bench Press',
    description: 'Builds upper body strength, focusing on chest.',
    icon: BenchPressIcon,
    primaryMuscles: ['chest', 'shoulders', 'arms'],
    minStamina: 30,
  },
  {
    id: 'dumbbells',
    name: 'Dumbbell Rack',
    description: 'Versatile for targeting specific arm muscles.',
    icon: DumbbellIcon,
    primaryMuscles: ['arms', 'shoulders'],
    minStamina: 15,
  },
  {
    id: 'squatRack',
    name: 'Squat Rack',
    description: 'The ultimate for leg day. Builds powerful legs and core.',
    icon: SquatRackIcon,
    primaryMuscles: ['legs', 'core', 'back'],
    minStamina: 40,
  },
  {
    id: 'rowingMachine',
    name: 'Rowing Machine',
    description: 'Full-body workout that hits back, arms, and legs.',
    icon: RowingMachineIcon,
    primaryMuscles: ['back', 'arms', 'legs'],
    minStamina: 25,
  },
];
