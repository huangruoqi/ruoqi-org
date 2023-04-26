import React, { useState } from 'react';
import './App.css';
import LineByLineBar from './components/LineByLineBar';

const MAX_LINE_LENGTH = 80

const TextDisplay = ({ receivedText }) => {
  return (
    <div className="text-display">
      <h3>Score</h3>
      <div className="text-container">
        <pre>{receivedText || 'No text received yet.'}</pre>
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
  const getCsrfToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  const [text, setText] = useState('');
  const [receivedText, setReceivedText] = useState('');

  const [analysis, setAnalysis] = useState({lines: [], values: []});

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrfToken = getCsrfToken();
      const response = await fetch('api/submit-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setReceivedText(JSON.stringify(data.sentiment));
        setAnalysis(getAnalysis(data.words, data.values))
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
      <TextDisplay receivedText={receivedText} />
      <div className='lines'>
      {analysis.lines.map((e, i) =>
        <LineByLineBar words={e} values={analysis.values[i]} />
      )}
      </div>
    </div>
  );
};

export default App;
