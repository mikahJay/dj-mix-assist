import React, { useState } from "react";
import httpRequestWrapper from './ApiWrapper';

function SearchComponent({ setResults, base_auth_url, base_search_url, client_id, client_secret }) {
  const [query, setQuery] = useState("");       // Stores the search text
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

    try {
      const data = await httpRequestWrapper(`${base_search_url}${query}`, base_auth_url, client_id, client_secret, setLoading, setError, setResults);
      setResults(data.tracks.items || []);
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
        data-testid='search-text'
        type="text"
        value={query}
        placeholder="Enter Track Name..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />

      {/* Search Button */}
      <button data-testid='search-button' onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p data-testid='error-text' style={{ color: "red" }}>{error}</p>}

    </div>
  );
}

export default SearchComponent;

