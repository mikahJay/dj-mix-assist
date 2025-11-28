import React from "react";

import TrackComponent from './TrackComponent';

function TrackListComponent({ results }) {
  return (
    <ul>
      {results.map((item, index) => ( 
        <li key={index}><TrackComponent track={item} /></li>
      ))} 
    </ul>
  );
}

export default TrackListComponent;
