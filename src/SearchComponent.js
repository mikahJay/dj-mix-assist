import React, { useState } from "react";

function SearchComponent({ base_auth_url, base_search_url, client_id, client_secret }) {
  const [query, setQuery] = useState("");       // Stores the search text
  const [results, setResults] = useState([]);   // Stores API results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch data from API
  const handleSearch = async () => {
    // Prevent empty search
    if (!query.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    // get auth token
    async function getAccessToken() {
      try {
        const response = await fetch(base_auth_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
          },
          body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        return data.access_token;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // search
    try {
      const token = await getAccessToken();
      const response = await fetch(`${base_search_url}${query}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }); 
      const data = await response.json();
      console.log(data.tracks.items[0].name);
      setResults(data.tracks.items || []);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Search Tracks from Spotify</h2>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        placeholder="Enter Track Name..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />

      {/* Search Button */}
      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results */}
      <ul>
        {results.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
