import React, { useState } from "react";

import TrackComponent from './TrackComponent';

function TrackListComponent({ results }) {

  const [selectedTracks, setSelectedTracks]= useState([]);

  return (
    <ul>
      {results.map((item, index) => ( 
        <li key={index}><TrackComponent track={item} setSelectedTracks={setSelectedTracks} /></li>
      ))} 
    </ul>
  );
}

export default TrackListComponent;
