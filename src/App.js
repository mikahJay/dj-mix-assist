import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './styles';
import SelectableListComponent from './SelectableListComponent';
import SelectedItemsListComponent from './SelectedItemsListComponent';
import SearchComponent from './SearchComponent';
import ApiWrapper from './ApiWrapper';

function App() {

  // TODO: move secrets somewhere else so they're not available to browser
  const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const base_auth_url = 'https://accounts.spotify.com/api/token';
  const base_search_url = 'https://api.spotify.com/v1/search?type=track&q=';

  // stores search results
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle selection
  const handleToggle = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item) // Deselect
        : [...prev, item] // Select
    );  
  };

  const apiWrapper = new ApiWrapper();
 
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <SearchComponent apiWrapper={apiWrapper} setResults={setResults} base_auth_url={base_auth_url} base_search_url={base_search_url}
          client_id={spotify_client_id} client_secret={spotify_client_secret}/>
        <div style={styles.app}>
          <SelectableListComponent
            items={results}
            selectedItems={selectedItems}
            onToggle={handleToggle}
          />  
          <SelectedItemsListComponent selectedItems={selectedItems} />
        </div>
      </div>
    </div>
  );
}

export default App;
