import React, { useMemo } from 'react';

interface CharacterAnimationProps {
  activeMuscles: Set<string>;
  repProgress: number; // 0 to 1
}

const Muscle: React.FC<{ name: string; isActive: boolean; className: string }> = ({ name, isActive, className }) => (
  <div className={`absolute bg-indigo-400/80 transition-all duration-300 ${className}`}>
    <div className={`w-full h-full ${isActive ? 'muscle-pulse' : ''}`}></div>
  </div>
);

const CharacterAnimation: React.FC<CharacterAnimationProps> = ({ activeMuscles, repProgress }) => {
  const sweatParticles = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * 2}s`,
      duration: `${1 + Math.random()}s`,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 50}%`,
    }))
  , []);

  return (
    <div className="w-48 h-80 relative" style={{ transform: `translateY(${repProgress * -20}px)` }}>
        {/* Sweat Particles */}
        {sweatParticles.map(p => (
            <div key={p.id} className="sweat-particle" style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration,
            }}></div>
        ))}
        {/* Head */}
        <div className="w-16 h-16 bg-indigo-300 rounded-full absolute top-0 left-1/2 -translate-x-1/2 z-10"></div>
        {/* Body */}
        <div className="w-24 h-32 bg-indigo-500/90 rounded-t-lg absolute top-14 left-1/2 -translate-x-1/2">
            <Muscle name="chest" isActive={activeMuscles.has('chest')} className="w-full h-1/2 top-0 rounded-t-lg" />
            <Muscle name="core" isActive={activeMuscles.has('core')} className="w-3/4 h-1/2 bottom-0 left-1/2 -translate-x-1/2" />
        </div>
        {/* Arms */}
        <div className="absolute top-16 left-0 w-full h-32 z-[-1]">
            <div className="absolute left-0 w-8 h-full">
                <Muscle name="shoulders" isActive={activeMuscles.has('shoulders')} className="w-full h-1/3 top-0 rounded-full" />
                <Muscle name="arms" isActive={activeMuscles.has('arms')} className="w-full h-2/3 bottom-0 rounded-b-lg" />
            </div>
            <div className="absolute right-0 w-8 h-full">
                <Muscle name="shoulders" isActive={activeMuscles.has('shoulders')} className="w-full h-1/3 top-0 rounded-full" />
                <Muscle name="arms" isActive={activeMuscles.has('arms')} className="w-full h-2/3 bottom-0 rounded-b-lg" />
            </div>
        </div>
        {/* Legs */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-36">
             <Muscle name="legs" isActive={activeMuscles.has('legs')} className="absolute left-0 w-[45%] h-full rounded-b-lg" />
             <Muscle name="legs" isActive={activeMuscles.has('legs')} className="absolute right-0 w-[45%] h-full rounded-b-lg" />
         </div>
         {/* Back (visible with some angles) */}
         <div className="absolute top-14 left-1/2 -translate-x-1/2 w-20 h-32 bg-indigo-600/50 rounded-lg z-[-1]">
             <Muscle name="back" isActive={activeMuscles.has('back')} className="w-full h-full"/>
         </div>
    </div>
  );
};

export default CharacterAnimation;
