import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import TrackListComponent from './TrackListComponent';
import './App.css'; // Optional: for styling

// Parent component
function App() {
  // TODO: move secrets somewhere else so they're not available to browser
  const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const base_auth_url = 'https://accounts.spotify.com/api/token';
  const base_search_url = 'https://api.spotify.com/v1/search?type=track&q=';

  // stores search results
  const [results, setResults] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mix Assist</h1>
        <p>Find a few Spotify tracks and automatically create mix recommendations.</p>
      </header>
      <div>
        {/* Prop drilling searchTerm and setter */}
        <SearchComponent setResults={setResults} base_auth_url={base_auth_url} base_search_url={base_search_url}
          client_id={spotify_client_id} client_secret={spotify_client_secret}/>
        <TrackListComponent results={results} />
      </div>
    </div>
  );
}

export default App;
