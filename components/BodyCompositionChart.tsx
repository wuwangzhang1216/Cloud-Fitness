import React from 'react';
import { PlayerStats } from '../types';

interface BodyCompositionChartProps {
  data: PlayerStats['muscleGroups'];
}

const MuscleShape: React.FC<{
    strength: number;
    path: string;
    glowFilterId: string;
    // FIX: Add optional opacity prop to allow overriding the calculated value.
    opacity?: number;
}> = ({ strength, path, glowFilterId, opacity: overrideOpacity }) => {
    const opacity = overrideOpacity !== undefined ? overrideOpacity : 0.1 + (strength / 100) * 0.9;
    return (
        <path
            d={path}
            fill="#818cf8"
            fillOpacity={opacity}
            stroke="#a7aff7"
            strokeWidth="1"
            style={{ filter: `url(#${glowFilterId})`, transition: 'fill-opacity 0.3s ease-in-out' }}
        />
    );
};


const BodyCompositionChart: React.FC<BodyCompositionChartProps> = ({ data }) => {
    const glowId = "muscle-glow";
    const strengthToDeviation = (strength: number) => 1 + (strength / 100) * 4;
    
    return (
        <svg width="100%" height="100%" viewBox="0 0 150 200">
            <defs>
                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                    {/* FIX: Explicitly type accumulator and current value in reduce to fix TypeScript error. */}
                    <feGaussianBlur stdDeviation={strengthToDeviation(Object.values(data).reduce((a: number, b: number) => a + b, 0) / 6)} result="coloredBlur" in="SourceGraphic" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Base Silhouette */}
            <path
                d="M75 10 C 60 10, 50 20, 50 35 C 50 50, 55 55, 45 65 C 35 75, 20 70, 20 90 L 20 170 C 20 190, 30 200, 40 200 L 60 200 L 60 130 L 70 120 L 70 200 L 80 200 L 80 120 L 90 130 L 90 200 L 110 200 C 120 200, 130 190, 130 170 L 130 90 C 130 70, 115 75, 105 65 C 95 55, 100 50, 100 35 C 100 20, 90 10, 75 10 Z"
                fill="#1f2937"
            />
            
            {/* Muscles */}
            <g>
                <MuscleShape strength={data.chest} glowFilterId={glowId} path="M75 55 C 60 55, 55 60, 55 70 L 95 70 C 95 60, 90 55, 75 55 Z" />
                <MuscleShape strength={data.shoulders} glowFilterId={glowId} path="M55 55 C 50 55, 45 60, 45 65 L 55 70 Z M95 55 C 100 55, 105 60, 105 65 L 95 70 Z" />
                <MuscleShape strength={data.arms} glowFilterId={glowId} path="M45 65 L 30 120 L 40 120 L 55 70 Z M105 65 L 120 120 L 110 120 L 95 70 Z" />
                <MuscleShape strength={data.core} glowFilterId={glowId} path="M60 75 L 90 75 L 90 110 L 60 110 Z" />
                {/* FIX: Pass opacity as a number, not a string. */}
                <MuscleShape strength={data.back} glowFilterId={glowId} path="M65 55 L 85 55 L 80 75 L 70 75 Z" opacity={0.5} />
                <MuscleShape strength={data.legs} glowFilterId={glowId} path="M40 125 L 65 125 L 65 190 L 40 190 Z M85 125 L 110 125 L 110 190 L 85 190 Z" />
            </g>
        </svg>
    );
};

export default BodyCompositionChart;