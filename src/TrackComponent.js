import React from "react";
import ApiWrapper from './ApiWrapper';

function TrackComponent({ track, setSelectedTracks }) {

  const handleSelectTrack = () => {
    console.log('selecting a track');
  };

  return (
    <div id={track.id}>
      <button
        onClick={handleSelectTrack}
        style={{
          marginLeft: '10px',
          fontSize: '20px',
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        +
      </button>
      {track.name} - ({track.artists[0].name})
    </div>
  );

}

export default TrackComponent;
