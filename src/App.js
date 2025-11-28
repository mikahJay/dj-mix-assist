import React from 'react';
import SearchComponent from './SearchComponent';
import DJMixAssistant from './DJMixAssistant';
import DJMixAnalyzer from './DJMixAnalyzer';
import './App.css'; // Optional: for styling

function App() {
  // TODO: move secrets somewhere else so they're not available to browser
  const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const base_auth_url = 'https://accounts.spotify.com/api/token';
  const base_search_url = 'https://api.spotify.com/v1/search?type=track&q=';
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, React!</h1>
        <p>This is a barebones React application.</p>
      </header>
      <div>
        <SearchComponent base_auth_url={base_auth_url} base_search_url={base_search_url} 
          client_id={spotify_client_id} client_secret={spotify_client_secret} />
      </div>
    </div>
  );
}

export default App;
