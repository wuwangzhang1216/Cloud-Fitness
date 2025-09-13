import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayerStats, Equipment } from '../types';
import { GYM_MAP_LAYOUT, TILE_SIZE, TILE_TO_EQUIPMENT_ID } from '../constants';
import { TileType } from '../types';
import AvatarCard from './AvatarCard';
import StatsPanel from './StatsPanel';
import AiCoachPanel from './AiCoachPanel';

interface GymViewProps {
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  equipmentList: Equipment[];
  onSelectWorkout: (equipment: Equipment) => void;
}

const keysPressed: { [key: string]: boolean } = {};

const GymView: React.FC<GymViewProps> = ({ playerStats, setPlayerStats, equipmentList, onSelectWorkout }) => {
  const [interactionTarget, setInteractionTarget] = useState<Equipment | null>(null);
  // FIX: Initialize useRef with null to avoid "Expected 1 arguments, but got 0" error.
  const gameLoopRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  const isWalkable = (x: number, y: number) => {
    if (y < 0 || y >= GYM_MAP_LAYOUT.length || x < 0 || x >= GYM_MAP_LAYOUT[0].length) {
      return false;
    }
    return GYM_MAP_LAYOUT[y][x] !== TileType.Wall;
  };
  
  const checkForInteraction = useCallback((x: number, y: number) => {
      const neighbors = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
      let targetEquipment: Equipment | null = null;

      for(const [nx, ny] of neighbors) {
          if (ny >= 0 && ny < GYM_MAP_LAYOUT.length && nx >= 0 && nx < GYM_MAP_LAYOUT[0].length) {
              const tile = GYM_MAP_LAYOUT[ny][nx];
              const equipmentId = TILE_TO_EQUIPMENT_ID[tile];
              if (equipmentId) {
                  const equipment = equipmentList.find(e => e.id === equipmentId);
                  if (equipment) {
                      targetEquipment = equipment;
                      break;
                  }
              }
          }
      }
      setInteractionTarget(targetEquipment);
  }, [equipmentList]);


  const gameLoop = useCallback(() => {
    const now = Date.now();
    const moveCooldown = 150; // milliseconds

    if (now - lastMoveTimeRef.current > moveCooldown) {
      let moved = false;
      setPlayerStats(prev => {
        let { x, y } = prev.position;
        const isRunning = keysPressed['shift'] && prev.stamina > 0;
        const speed = 1;

        if (keysPressed['w']) { y -= speed; moved = true; }
        if (keysPressed['s']) { y += speed; moved = true; }
        if (keysPressed['a']) { x -= speed; moved = true; }
        if (keysPressed['d']) { x += speed; moved = true; }

        if (moved && isWalkable(x, y)) {
          lastMoveTimeRef.current = now;
          const staminaCost = isRunning ? 2 : 0;
          if (prev.stamina >= staminaCost) {
              checkForInteraction(x, y);
              return { ...prev, position: { x, y }, stamina: prev.stamina - staminaCost };
          }
        }
        return prev;
      });
    }

     // Stamina regeneration
    setPlayerStats(prev => {
        if (prev.stamina < 100) {
            return { ...prev, stamina: Math.min(100, prev.stamina + 0.1) };
        }
        return prev;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [setPlayerStats, checkForInteraction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = true;
       if (e.key.toLowerCase() === 'e' && interactionTarget) {
           if(!interactionTarget.name.includes('Soon')) {
                onSelectWorkout(interactionTarget);
           }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => { keysPressed[e.key.toLowerCase()] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    checkForInteraction(playerStats.position.x, playerStats.position.y);
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup',handleKeyUp);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoop, interactionTarget, onSelectWorkout]);

  const getTileComponent = (tile: TileType, x: number, y: number) => {
    const key = `${x}-${y}`;
    const equipmentId = TILE_TO_EQUIPMENT_ID[tile];
    const equipment = equipmentList.find(e => e.id === equipmentId);

    if (equipment) {
        const Icon = equipment.icon;
        return <div key={key} className="flex items-center justify-center bg-gray-700/50"><Icon className="w-8 h-8 text-indigo-300" /></div>;
    }

    switch (tile) {
      case TileType.Wall: return <div key={key} className="bg-gray-800 border-t border-gray-600"></div>;
      case TileType.Floor: return <div key={key} className="bg-gray-700/50"></div>;
      default: return <div key={key} className="bg-gray-700"></div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <AvatarCard level={playerStats.level} caloriesBurned={playerStats.caloriesBurned} stamina={Math.round(playerStats.stamina)} />
        <StatsPanel muscleGroups={playerStats.muscleGroups} />
        <AiCoachPanel playerStats={playerStats} />
      </div>
      
      <div className="lg:col-span-3 bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700 aspect-[16/9] relative overflow-hidden">
        <div className="grid" style={{
            gridTemplateColumns: `repeat(${GYM_MAP_LAYOUT[0].length}, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(${GYM_MAP_LAYOUT.length}, ${TILE_SIZE}px)`,
        }}>
           {GYM_MAP_LAYOUT.map((row, y) => row.map((tile, x) => getTileComponent(tile, x, y)))}
        </div>
         <div 
            className="absolute bg-green-400 rounded-full w-10 h-10 border-2 border-white shadow-lg transition-all duration-150 ease-linear"
            style={{
                left: playerStats.position.x * TILE_SIZE + (TILE_SIZE / 2) - 20,
                top: playerStats.position.y * TILE_SIZE + (TILE_SIZE / 2) - 20,
            }}
        />
        {interactionTarget && (
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                Press 'E' to use {interactionTarget.name}
                {interactionTarget.name.includes('Soon') && <span className="text-yellow-400 text-sm"> (Coming Soon)</span>}
            </div>
        )}
      </div>
    </div>
  );
};

export default GymView;
