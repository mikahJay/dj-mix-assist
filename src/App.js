import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './styles';
import SelectableListComponent from './SelectableListComponent';
import SelectedItemsListComponent from './SelectedItemsListComponent';
import SearchComponent from './SearchComponent';
import ApiWrapper from './ApiWrapper';

function App({ initialItems }) {

  // TODO: move secrets somewhere else so they're not available to browser
  const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const base_auth_url = 'https://accounts.spotify.com/api/token';
  const base_search_url = 'https://api.spotify.com/v1/search?type=track&q=';

  // store search results - default to injected for testability
  const [results, setResults] = useState(initialItems || []);

  // toggle selected state for an item
  const toggleItem = (id) => {
    setResults((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectedItems = results.filter((item) => item.selected);
  const apiWrapper = new ApiWrapper();
 
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <SearchComponent apiWrapper={apiWrapper} setResults={setResults} base_auth_url={base_auth_url} base_search_url={base_search_url}
          client_id={spotify_client_id} client_secret={spotify_client_secret}/>
        <div style={styles.app}>
          <SelectableListComponent items={results} onToggle={toggleItem} />
          <SelectedItemsListComponent items={selectedItems} />
        </div>
      </div>
    </div>
  );
}

export default App;
