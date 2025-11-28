import React from "react";

function TrackListComponent({ results }) {
  return (
    <ul>
      {results.map((item, index) => ( 
        <li key={index}>{JSON.stringify(item)}</li>
      ))} 
    </ul>
  );
}

export default TrackListComponent;
