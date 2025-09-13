import React from 'react';
import type { PlayerDirection } from '../types';

interface PlayerSpriteProps {
  x: number;
  y: number;
  direction: PlayerDirection;
  isMoving: boolean;
  isRunning: boolean;
  isExhausted: boolean;
}

const PlayerSprite: React.FC<PlayerSpriteProps> = ({ x, y, direction, isMoving, isRunning, isExhausted }) => {
  const spriteUrl = "https://i.ibb.co/bF9MhM3/player-sprite-sheet.png";

  let stateClass = 'idle';
  if (isMoving) {
    stateClass = isRunning ? 'running' : 'walking';
  }
  if (isExhausted) {
    stateClass = 'exhausted';
  }

  return (
    <div
      className="absolute transition-transform duration-100 ease-linear"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '48px',
        height: '48px',
        transform: 'translate(-50%, -75%)',
        overflow: 'hidden',
      }}
    >
      <div 
        id="player-sprite-sheet"
        className={`player-sprite ${stateClass} ${direction}`}
        style={{
          backgroundImage: `url(${spriteUrl})`,
        }}
      >
      </div>
    </div>
  );
};

export default PlayerSprite;
