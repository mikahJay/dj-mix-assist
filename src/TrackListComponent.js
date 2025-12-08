import React, { useState } from "react";

import TrackComponent from './TrackComponent';

function TrackListComponent({ results, setSelectedTracks }) {
  console.log(results);
  if (results.length == 0) { return (<div>No results found.</div>); }
  return (
    <div>
      <div>Track List:</div>
      <ul>
        {results.map((item, index) => (
          <TrackComponent track={item} setSelectedTracks={setSelectedTracks} />
        ))} 
      </ul>
    </div>
  );
}

export default TrackListComponent;
