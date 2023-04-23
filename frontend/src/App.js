import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/submit-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Text submitted successfully');
      } else {
        alert('Failed to submit text');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting text');
    }

    setText('');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h2>Text Input Form</h2>
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
    </div>
  );
};

export default App;
