import React from 'react';

const DonutProgressBar = ({
  progress,
  size = 100,
  strokeWidth = 8,
  backgroundColor = '#e0e0e0',
  progressColor = '#3f51b5',
  textColor = '#333',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const real_progress = Math.min(progress, 1)
  const offset = circumference - real_progress * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={backgroundColor}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={progressColor}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={size * 0.2}
        fontWeight="bold"
        fill={textColor}
      >
        {Math.floor(real_progress*100)}%
      </text>
    </svg>
  );
};

export default DonutProgressBar;

