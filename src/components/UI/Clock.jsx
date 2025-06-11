import React from 'react';
import { useGameContext } from '../../context/GameStatusContext';

const AnalogClock = () => {
    const { status } = useGameContext();

  const hourDeg = (status.time.hour % 12 + status.time.minute / 60) * 30;
  const minuteDeg = status.time.minute * 6;

  return (
    <div className="absolute left-45 -top-25 z-1000">
        <svg width="100" height="100" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="95" stroke="#333" strokeWidth="4" fill="#fff" />

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="60"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 100 100)`}
      />

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        stroke="#666"
        strokeWidth="4"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg} 100 100)`}
      />

      <circle cx="100" cy="100" r="4" fill="#000" />
    </svg>
    </div>
  );
};

export default AnalogClock;
