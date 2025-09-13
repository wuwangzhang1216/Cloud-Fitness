
import React from 'react';

type IconProps = {
    className?: string;
};

export const TreadmillIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 13.2c0-2.1 1.2-3.8 3-4.5v-3.7h2v4.2c1.8.8 3 2.5 3 4.5v5.8h-2v-3.5h-4V19H2Z"/>
    <path d="M12 11.2c0-2.1 1.2-3.8 3-4.5V3h2v4.2c1.8.8 3 2.5 3 4.5v6.8h-2v-4h-4v4h-2Z"/>
  </svg>
);

export const BenchPressIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 14 3-3 3 3"/>
    <path d="m16 14 3-3 3 3"/>
    <path d="M3 11h18"/>
    <path d="M5 11v8h2v-8"/><path d="M17 11v8h2v-8"/>
  </svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.4 14.4 9.6 9.6"/>
        <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l-1.768 1.768a2 2 0 1 1-2.828-2.828l-1.768 1.768a2 2 0 1 1-2.828-2.828l8.486-8.486a2 2 0 1 1 2.828 2.828l1.768-1.768a2 2 0 1 1 2.829 2.829l1.767-1.768a2 2 0 1 1 2.829 2.828l1.768-1.768a2 2 0 1 1 2.828 2.828L18.657 21.485Z"/>
    </svg>
);

export const SquatRackIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6h20"/><path d="M4 6v14"/><path d="M20 6v14"/>
    <path d="M8 6V4h8v2"/>
    <path d="M8 12h8"/>
    <path d="M8 18h8"/>
  </svg>
);

export const RowingMachineIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10h14"/>
        <path d="M4 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
        <path d="m14 18-3-6-1 2"/>
        <path d="m16 10 3 3-3 3"/>
        <path d="M3 10 7 6l3 2.5"/>
        <path d="M13.5 6.5 17 3"/>
        <path d="m22 2-3 1 1 3 3-1-1-3Z"/>
    </svg>
);
