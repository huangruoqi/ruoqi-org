import React from 'react';
import './LineByLineBar.css';

const LineByLineBar = ({ words, values }) => {
  const getColor = (value) => {
    return value > 0 ? 'green' : value < 0 ? 'red' : 'gray';
  }; 
  const segmentLengths = words.map((e, i)=>e.length); 
  const sum = segmentLengths.reduce((a, b)=>a+b, 0) + segmentLengths.length-1
  const ratios = segmentLengths.map((e, i)=>((((i>0&&i<segmentLengths.length-1)?1:0.5)+e)*100)/sum);
  console.log(sum)

  const createGradient = () => {


    let total = 0;
    let gradient = '';

    values.forEach((value, index) => {
      const startPos = total;
      const endPos = startPos + ratios[index];
      const midPos = (startPos + endPos)/2;
      const color = getColor(value);
      if (index === 0) {
        gradient += `, ${color} ${startPos}%, ${color} ${midPos}%`;
      } else {
        gradient += `, ${color} ${midPos}%`;
      }

      if (index === words.length - 1) {
        gradient += `, ${color} ${endPos}%`;
      }
        total += ratios[index];
    });

    return `linear-gradient(to right${gradient})`;
  };

  return (
    <div className="line-by-line-bar">
      <div className="words-container">
        {words.join(' ')}
      </div>
      <div className="child">
        <div className="bar" style={{ background: createGradient()}}></div>
      </div>
    </div>
  );
};

export default LineByLineBar;
