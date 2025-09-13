import React, { useState, useEffect, useRef } from 'react';
import type { PlayerStats, Equipment, PlayerDirection } from '../types';
import Dashboard from './Dashboard';
import EquipmentCard from './EquipmentCard';
import PlayerSprite from './PlayerSprite';

interface GymViewProps {
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  equipmentList: Equipment[];
  onSelectWorkout: (equipment: Equipment, origin: {x: number, y: number}) => void;
}

const GymView: React.FC<GymViewProps> = ({
  playerStats,
  setPlayerStats,
  equipmentList,
  onSelectWorkout,
}) => {
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<PlayerDirection>('down');
  const [isMoving, setIsMoving] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const isRunning = playerStats.stamina > 20;

  useEffect(() => {
    let animationFrameId: number;

    const move = () => {
      if (!target) {
        setIsMoving(false);
        return;
      }
      
      setIsMoving(true);

      setPlayerStats(prev => {
        const speed = isRunning ? 4 : 2;
        const dx = target.x - prev.position.x;
        const dy = target.y - prev.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
          setTarget(null);
          return { ...prev, position: { x: target.x, y: target.y } };
        }

        const newX = prev.position.x + (dx / distance) * speed;
        const newY = prev.position.y + (dy / distance) * speed;
        
        // Update direction
        if (Math.abs(dx) > Math.abs(dy)) {
            setDirection(dx > 0 ? 'right' : 'left');
        } else {
            setDirection(dy > 0 ? 'down' : 'up');
        }

        const staminaDrain = isRunning ? 0.1 : 0.02;

        return {
          ...prev,
          position: { x: newX, y: newY },
          stamina: Math.max(0, prev.stamina - staminaDrain),
        };
      });
      animationFrameId = requestAnimationFrame(move);
    };

    if (target && playerStats.stamina > 0) {
      animationFrameId = requestAnimationFrame(move);
    } else {
      setIsMoving(false);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, setPlayerStats, isRunning]);

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      setTarget({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleSelect = (equipment: Equipment, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent game area click
    const rect = event.currentTarget.getBoundingClientRect();
    const gameAreaRect = gameAreaRef.current!.getBoundingClientRect();
    
    const origin = {
        x: rect.left - gameAreaRect.left + rect.width / 2,
        y: rect.top - gameAreaRect.top + rect.height / 2,
    };
    onSelectWorkout(equipment, origin);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-1/3 xl:w-1/4 h-full overflow-y-auto pr-2">
        <Dashboard playerStats={playerStats} />
      </aside>
      <section 
        ref={gameAreaRef}
        className="lg:w-2/3 xl:w-3/4 h-full bg-gray-800/30 rounded-lg relative border-2 border-gray-700 overflow-hidden"
        onClick={handleAreaClick}
        style={{
            backgroundImage: 'radial-gradient(circle, #4a5568 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
        }}
      >
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {equipmentList.map(eq => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              onSelect={handleSelect}
              disabled={playerStats.stamina < eq.minStamina}
            />
          ))}
        </div>
        <PlayerSprite 
            x={playerStats.position.x}
            y={playerStats.position.y}
            direction={direction}
            isMoving={isMoving}
            isRunning={isRunning && playerStats.stamina > 0}
            isExhausted={playerStats.stamina === 0}
        />
      </section>
    </div>
  );
};

export default GymView;
