import React from 'react';
import DJMixAssistant from './DJMixAssistant';
import DJMixAnalyzer from './DJMixAnalyzer';
import './App.css'; // Optional: for styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, React!</h1>
        <p>This is a barebones React application.</p>
      </header>
      <div>
        <DJMixAssistant />
        <DJMixAnalyzer />
      </div>
    </div>
  );
}

export default App;
