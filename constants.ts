import { PlayerStats, Equipment, TileType } from './types';
import {
  TreadmillIcon,
  BenchPressIcon,
  DumbbellIcon,
  SquatRackIcon,
  RowingMachineIcon,
} from './components/icons/WorkoutIcons';

export const TILE_SIZE = 48; // px

export const INITIAL_PLAYER_STATS: PlayerStats = {
  level: 1,
  stamina: 100,
  caloriesBurned: 0,
  position: { floor: 'ground', x: 5, y: 8 },
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
  { id: 'treadmill', name: 'Treadmill', description: 'Cardio workout.', icon: TreadmillIcon, primaryMuscles: ['legs', 'core'], minStamina: 20 },
  { id: 'benchPress', name: 'Bench Press', description: 'Upper body strength.', icon: BenchPressIcon, primaryMuscles: ['chest', 'shoulders', 'arms'], minStamina: 30 },
  { id: 'dumbbells', name: 'Dumbbell Rack', description: 'Versatile arm targeting.', icon: DumbbellIcon, primaryMuscles: ['arms', 'shoulders'], minStamina: 15 },
  { id: 'squatRack', name: 'Squat Rack', description: 'Powerful legs and core.', icon: SquatRackIcon, primaryMuscles: ['legs', 'core', 'back'], minStamina: 40 },
  { id: 'rowingMachine', name: 'Rowing Machine', description: 'Full-body workout.', icon: RowingMachineIcon, primaryMuscles: ['back', 'arms', 'legs'], minStamina: 25 },
];

const W = TileType.Wall;
const E = TileType.Empty;
const T = TileType.Treadmill;
const B = TileType.BenchPress;
const D = TileType.Dumbbells;
const S = TileType.SquatRack;
const R = TileType.RowingMachine;
const U = TileType.StairsUp;
const O = TileType.StairsDown; // dOwn

export const GYM_FLOORS = {
    ground: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, E, E, E, W, T, T, W, E, E, E, E, E, U, W],
        [W, E, E, E, W, T, T, W, E, E, E, E, E, E, W],
        [W, E, E, E, W, W, W, W, W, W, B, W, W, W, W],
        [W, E, E, E, E, E, E, E, E, W, B, W, E, E, W],
        [W, W, W, W, W, E, E, E, E, W, W, W, E, E, W],
        [W, R, R, W, W, E, E, E, E, E, E, E, E, E, W],
        [W, R, R, W, W, E, E, E, E, E, E, E, E, E, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    second: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, O, W],
        [W, D, D, W, W, S, S, W, W, E, E, E, E, E, W],
        [W, D, D, W, W, S, S, W, W, E, E, B, B, W, W],
        [W, E, E, W, W, W, W, W, W, E, E, B, B, W, W],
        [W, E, E, E, E, E, E, E, E, E, E, W, W, W, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, U, W],
        [W, W, W, W, W, W, W, E, E, E, E, E, E, E, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    rooftop: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, E, E, E, W, W, W, W, W, E, E, E, E, E, W],
        [W, E, E, E, W, E, E, E, W, E, E, E, E, E, W],
        [W, E, E, E, W, E, E, E, W, E, E, E, E, E, W],
        [W, E, E, E, W, W, W, W, W, E, E, E, E, O, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, E, E, E, E, E, E, E, E, E, E, E, E, E, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ]
}

export const STAIR_CONNECTIONS: {[key: string]: {floor: string, x: number, y: number}} = {
    'ground-13-1': { floor: 'second', x: 13, y: 2 },
    'second-13-1': { floor: 'ground', x: 13, y: 2 },
    'second-13-6': { floor: 'rooftop', x: 13, y: 5 },
    'rooftop-13-6': { floor: 'second', x: 13, y: 5 },
}

export const TILE_TO_EQUIPMENT_ID: {[key in TileType]?: string} = {
    [TileType.Treadmill]: 'treadmill',
    [TileType.BenchPress]: 'benchPress',
    [TileType.Dumbbells]: 'dumbbells',
    [TileType.SquatRack]: 'squatRack',
    [TileType.RowingMachine]: 'rowingMachine',
};
