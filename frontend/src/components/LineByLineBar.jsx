import React from 'react';
import './LineByLineBar.css';

function clamp(a, b, c, d, e) {
  const v = (a - b) / (c - b) * (e - d) + d
  return Math.max(d, Math.min(e, v))
}

const LineByLineBar = ({ words, values }) => {
  const getColor = (value) => {
    const convert = (v) => clamp(Math.log(v),-8, -1, 0, 1)
    if (value < 1)
      return `rgb(230, ${convert(1-value)*230}, ${convert(1-value)*230})`
    else if (value < 2)
      return `rgb(230, 230, ${convert(2-value)*230})`
    else
      return `rgb(${convert(3-value)*230}, 230, ${convert(3-value)*230})`
  }; 
  const segmentLengths = words.map((e, i)=>e.length); 
  const sum = segmentLengths.reduce((a, b)=>a+b, 0) + segmentLengths.length-1
  const ratios = segmentLengths.map((e, i)=>((((i>0&&i<segmentLengths.length-1)?1:0.5)+e)*100)/sum);

  const createGradient = () => {


    let total = 0;
    let gradient = '';

    values.forEach((value, index) => {
      const startPos = total;
      const endPos = startPos + ratios[index];
      // const midPos = (startPos + endPos)/2;
      const color = getColor(value);
      // if (index === 0) {
        gradient += `, ${color} ${startPos}%, ${color} ${endPos}%`;
      // } else {
      //   gradient += `, ${color} ${midPos}%`;
      // }

      // if (index === words.length - 1) {
      //   gradient += `, ${color} ${endPos}%`;
      // }
        total += ratios[index];
    });

    return `linear-gradient(to right${gradient})`;
  };

  return (
    <div className="line-by-line-bar">
      <div className="words-container">
        {words.join(' ')}
        <div className="child">
          <div className="bar" style={{ background: createGradient()}}></div>
        </div>
      </div>
    </div>
  );
};

export default LineByLineBar;
