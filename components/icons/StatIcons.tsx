
import React from 'react';

type IconProps = {
    className?: string;
};

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export const FireIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5-2 4.5-2 4.5-.5 1 .5 1.5 1.5 1.5.65 0 1 .5 1 1.5a2.5 2.5 0 0 0 2.5 2.5c2 0 2.5-1.5 2.5-3 .5-1.5-1.5-2.5-1.5-2.5-1.5-1.5.5-3 1.5-3 1 0 1 .5 1 1a2 2 0 0 1-2 2c0 .5 0 1 .5 1.5s1.5 1 2.5 1c1 0 1-.5 1-1.5a5.5 5.5 0 0 0-11-1c-1.25 2.5-2 6 0 8.5Z"/><path d="M14.5 16.5c1 0 1.5.5 1.5 1.5a2.5 2.5 0 0 1-5 0c0-.83.5-1.5 1.5-1.5"/>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5v.75a2.5 2.5 0 0 1-5 0V4.5A2.5 2.5 0 0 1 12 2Z"/>
        <path d="M12 15a2.5 2.5 0 0 0-2.5 2.5v.75a2.5 2.5 0 0 0 5 0V17.5A2.5 2.5 0 0 0 12 15Z"/>
        <path d="M5.5 12a2.5 2.5 0 0 0 2.5-2.5h-.75a2.5 2.5 0 0 0 0 5h.75A2.5 2.5 0 0 0 5.5 12Z"/>
        <path d="M18.5 12a2.5 2.5 0 0 1-2.5-2.5h.75a2.5 2.5 0 0 1 0 5h-.75a2.5 2.5 0 0 1-2.5-2.5Z"/>
        <path d="M12 15h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1"/>
        <path d="M15 11.5v-1a1 1 0 0 0-1-1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1"/>
        <path d="M9 12.5v1a1 1 0 0 1 1 1h2a1 1 0 0 0 1 1v2a1 1 0 0 0 1 1h1"/>
        <path d="M9 11.5v-1a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1"/>
    </svg>
);
