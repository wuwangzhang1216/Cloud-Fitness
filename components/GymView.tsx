
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayerStats, PlayerDirection } from '../types';
// FIX: TileType is defined in types.ts and should be imported from there.
import { TileType } from '../types';
import { GYM_FLOORS, TILE_SIZE, STAIR_CONNECTIONS, TILE_TO_EQUIPMENT_ID, EQUIPMENT_LIST } from '../constants';
import Dashboard from './Dashboard';
import PlayerSprite from './PlayerSprite';
import { TreadmillIcon, BenchPressIcon, DumbbellIcon, SquatRackIcon, RowingMachineIcon } from './icons/WorkoutIcons';

interface GymViewProps {
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  onSelectWorkout: (equipmentId: string) => void;
}

const TileIconMap: { [key in TileType]?: React.FC<{ className?: string }> } = {
    [TileType.Treadmill]: TreadmillIcon,
    [TileType.BenchPress]: BenchPressIcon,
    [TileType.Dumbbells]: DumbbellIcon,
    [TileType.SquatRack]: SquatRackIcon,
    [TileType.RowingMachine]: RowingMachineIcon,
};

const GymView: React.FC<GymViewProps> = ({ playerStats, setPlayerStats, onSelectWorkout }) => {
  const [keys, setKeys] = useState<Record<string, boolean>>({});
  const [direction, setDirection] = useState<PlayerDirection>('down');
  const [isMoving, setIsMoving] = useState(false);
  const [interactionPrompt, setInteractionPrompt] = useState<string | null>(null);
  const [isChangingFloor, setIsChangingFloor] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  // FIX: useRef for a mutable ref requires an initial value. Initialize with null.
  const gameLoopRef = useRef<number | null>(null);

  const currentFloor = playerStats.position.floor as keyof typeof GYM_FLOORS;
  const currentMap = GYM_FLOORS[currentFloor];
  
  const isRunning = keys['Shift'] && playerStats.stamina > 0;

  const getTileAt = useCallback((x: number, y: number) => {
    return currentMap[Math.floor(y)]?.[Math.floor(x)];
  }, [currentMap]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.key]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.key]: false }));
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle interactions
  useEffect(() => {
    const handleInteraction = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'e') return;

      const { x, y } = playerStats.position;
      const key = `${currentFloor}-${Math.round(x)}-${Math.round(y)}`;
      
      // Stair interaction
      if (STAIR_CONNECTIONS[key]) {
        setIsChangingFloor(true);
        setTimeout(() => {
          setPlayerStats(prev => ({ ...prev, position: STAIR_CONNECTIONS[key]! }));
          setIsChangingFloor(false);
        }, 300); // Wait for fade-out
        return;
      }

      // Equipment interaction
      const tile = getTileAt(x, y);
      if (tile && TILE_TO_EQUIPMENT_ID[tile]) {
        const equipmentId = TILE_TO_EQUIPMENT_ID[tile]!;
        const equipment = EQUIPMENT_LIST.find(eq => eq.id === equipmentId);
        if (equipment && playerStats.stamina >= equipment.minStamina) {
          onSelectWorkout(equipmentId);
        }
      }
    };
    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [playerStats, currentFloor, getTileAt, onSelectWorkout, setPlayerStats]);


  // Game loop
  const gameLoop = useCallback(() => {
    let dx = 0;
    let dy = 0;
    if (keys['w'] || keys['ArrowUp']) dy -= 1;
    if (keys['s'] || keys['ArrowDown']) dy += 1;
    if (keys['a'] || keys['ArrowLeft']) dx -= 1;
    if (keys['d'] || keys['ArrowRight']) dx += 1;

    let currentIsMoving = dx !== 0 || dy !== 0;
    
    if(currentIsMoving) {
        if (Math.abs(dx) > Math.abs(dy)) {
            setDirection(dx > 0 ? 'right' : 'left');
        } else {
            setDirection(dy > 0 ? 'down' : 'up');
        }
    }
    
    setIsMoving(currentIsMoving && playerStats.stamina > 0);

    setPlayerStats(prev => {
      if (!currentIsMoving || prev.stamina <= 0) {
        return prev;
      }
      
      const speed = (isRunning ? 0.12 : 0.06);
      let newX = prev.position.x + dx * speed;
      let newY = prev.position.y + dy * speed;
      
      const staminaDrain = isRunning ? 0.2 : 0;

      // Collision detection
      const tile = getTileAt(newX, newY);
      if (tile === TileType.Wall) {
          currentIsMoving = false;
          return { ...prev, stamina: Math.max(0, prev.stamina - staminaDrain) };
      }
      
      // Update interaction prompt
      const currentTile = getTileAt(newX, newY);
      const stairKey = `${currentFloor}-${Math.round(newX)}-${Math.round(newY)}`;
      if (STAIR_CONNECTIONS[stairKey]) {
        const dest = STAIR_CONNECTIONS[stairKey]!;
        setInteractionPrompt(`Press [E] to go to ${dest.floor} floor`);
      } else if (currentTile && TILE_TO_EQUIPMENT_ID[currentTile]) {
          const eqId = TILE_TO_EQUIPMENT_ID[currentTile]!;
          const eq = EQUIPMENT_LIST.find(e => e.id === eqId)!;
          if (prev.stamina < eq.minStamina) {
            setInteractionPrompt(`${eq.name} (Not enough stamina)`);
          } else {
            setInteractionPrompt(`Press [E] to use ${eq.name}`);
          }
      } else {
        setInteractionPrompt(null);
      }

      return {
        ...prev,
        position: { ...prev.position, x: newX, y: newY },
        stamina: Math.max(0, prev.stamina - staminaDrain),
      };
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [keys, isRunning, setPlayerStats, getTileAt, currentFloor]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameLoop]);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-1/3 xl:w-1/4 h-full overflow-y-auto pr-2">
        <Dashboard playerStats={playerStats} />
      </aside>
      <section 
        ref={gameAreaRef}
        className={`lg:w-2/3 xl:w-3/4 h-full rounded-lg relative border-2 border-gray-700 overflow-hidden floor-${currentFloor} ${isChangingFloor ? 'fade-transition' : ''}`}
      >
        {currentMap.map((row, y) => (
          row.map((tile, x) => {
            const Icon = TileIconMap[tile];
            return (
              <div
                key={`${y}-${x}`}
                className={`absolute ${tile === TileType.Wall ? 'tile-wall' : ''} ${(tile === TileType.StairsUp || tile === TileType.StairsDown) ? 'tile-stairs' : ''}`}
                style={{
                  left: x * TILE_SIZE,
                  top: y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                }}
              >
               {Icon && <Icon className="w-full h-full p-1.5 text-indigo-300" />}
              </div>
            );
          })
        ))}

        <PlayerSprite 
            x={playerStats.position.x * TILE_SIZE}
            y={playerStats.position.y * TILE_SIZE}
            direction={direction}
            isMoving={isMoving}
            isRunning={isRunning}
            isExhausted={playerStats.stamina === 0}
        />
        
        {interactionPrompt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg">
                {interactionPrompt}
            </div>
        )}
      </section>
    </div>
  );
};

export default GymView;