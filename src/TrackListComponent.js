import React, { useState } from "react";

import TrackComponent from './TrackComponent';

function TrackListComponent({ results, setSelectedTracks }) {

  return (
    <ul>
      {results.map((item, index) => (
        <TrackComponent track={item} setSelectedTracks={setSelectedTracks} />
      ))} 
    </ul>
  );
}

export default TrackListComponent;
