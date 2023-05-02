import React, { useEffect, useState } from 'react';
import './App.css';
import { ReactComponent as Happy } from './img/happy.svg';
import { ReactComponent as Sad } from './img/sad.svg';
import { ReactComponent as Neutral } from './img/neutral.svg';
import LineByLineBar from './components/LineByLineBar';
import DonutProgressBar from './components/DonutProgressBar';

const MAX_LINE_LENGTH = 80
const RATE = 0.01

const TextDisplay = ({ progress_status, progress_value, label }) => {
  return (
    <div className="text-display">
      <h3>Result</h3>
        <div className="result-container" style={{background:""}}>
        {progress_status>0?
          <DonutProgressBar 
          progress={progress_value}
          progressColor = {progress_status===1 ? '#3f51b5' : '#34df34'}
          /> :
          <>
            {label==="2"&&<Happy width="150" height="150"/>}
            {label==="1"&&<Neutral width="150" height="150"/>}
            {label==="0"&&<Sad width="150" height="150"/>}
          </>
        }
        </div>

    </div>
  );
};

function getAnalysis(words, values) {
  const analysis = {lines: [], values: []}
  const length = words.length
  let index = 0;
  let current = 0;
  let tempWords = []
  let tempValues = []
  while (index < length) {
    const word = words[index]
    if (current + word.length > MAX_LINE_LENGTH) {
      analysis.lines.push(tempWords)
      analysis.values.push(tempValues)
      tempWords = []
      tempValues = []
      current = 0
    }
    else {
      tempWords.push(word)
      tempValues.push(values[index])
      current += word.length + 1
      index++;
    }
  }
  if (tempWords.length > 0) {
    analysis.lines.push(tempWords)
    analysis.values.push(tempValues)
  }
  return analysis
}


const App = () => {
  function update_progress_fake(current, rate) {
    return current + (1-current)/((current+0.01)*100) * rate
  }
  function update_progress_done(current, rate) {
    const result = current + rate
    if (result >= 2) {
      setPS(0)
      return 0
    }
    if (result >= 1) {
      return result+rate
    }
    return result
  }
  const getCsrfToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  const [text, setText] = useState('');
  const [progress_value, setValue] = useState(0);
  const [progress_status, setPS] = useState(0)
  useEffect(()=> {
    const id = setInterval(() => {
      if (progress_status>0) {
        if (progress_status === 1) {
          setValue(v=>update_progress_fake(v, RATE))
        }
        else {
          setValue(v=>update_progress_done(v, RATE))
        }
      }
    }, 16)
    return () => clearInterval(id)
  }, [progress_status])
  
  const [label, setLabel] = useState('');

  const [analysis, setAnalysis] = useState({lines: [], values: []});

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPS(1)
      const csrfToken = getCsrfToken();
      const response = await fetch('submit-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        const t = data.sentiment[0]["label"][6]
        console.log(t)
        setLabel(t);
        setAnalysis(getAnalysis(data.words, data.values))
        setPS(2)
      } else {
        alert('Failed to submit text');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting text');
    }
    // setText('');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h2>Sentiment Analysis</h2>
        <textarea
          value={text}
          onChange={handleChange}
          className="text-input"
          placeholder="Enter your text paragraph here"
          rows={6}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <TextDisplay label={label} progress_status={progress_status} progress_value={progress_value} />
      <div className='lines'>
      {progress_status === 0 && analysis.lines.map((e, i) =>
        <LineByLineBar words={e} values={analysis.values[i]} />
      )}
      <div>
      </div>
      </div>
    </div>
  );
};

export default App;
