import React from 'react';
import './LineByLineBar.css';

const LineByLineBar = ({ words, values }) => {
  const getColor = (value) => {
    return value > 0 ? 'green' : value < 0 ? 'red' : 'gray';
  };

  const createGradient = () => {
    const segmentLengths = words.map((e, i)=>e.length/1.05);
    let total = 0;
    let gradient = '';

    values.forEach((value, index) => {
      const startPos = total;
      const endPos = startPos + segmentLengths[index];
      const color = getColor(value);
      gradient += `, ${color} ${startPos}%, ${color} ${endPos}%`;
        total += segmentLengths[index];
    });

    return `linear-gradient(to right${gradient})`;
  };

  return (
    <div className="line-by-line-bar">
      <div className="words-container">
        {words.map((word, index) => (
          <span key={index} className="word">
            {word}
          </span>
        ))}
      </div>
      <div className="bar" style={{ background: createGradient() }}></div>
    </div>
  );
};

export default LineByLineBar;
