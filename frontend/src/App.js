import React, { useState } from 'react';
import './App.css';

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

const App = () => {
  const getCsrfToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  const [text, setText] = useState('');
  const [receivedText, setReceivedText] = useState('');

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
    </div>
  );
};

export default App;
