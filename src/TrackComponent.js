import React, { useState }  from "react";
import ApiWrapper from './ApiWrapper';

function TrackComponent({ track, selectedTracks, setSelectedTracks }) {

  // default to not selected  
  const [selected, setSelected] = useState(false);

  // select track by value
  const handleSelectTrack = (event) => {
    setSelected(true);
    setSelectedTracks(prev => [...prev, event.target.value]);
    console.log(`selecting track ${event.target.value}`);
  };  

  // remove track by value
  const handleRemoveTrack = (event) => {
    setSelected(false);
    setSelectedTracks(prevItems => prevItems.filter(item => item.id !== event.target.value));

    console.log('list of selected tracks: ' + selected);
    console.log(`removing track ${event.target.value}`);
  }

  return (
    <div id={track.id}>
      <li key={track.href}>
        <button
          value={track.href}
          onClick={selected ? handleRemoveTrack : handleSelectTrack}
          style={{
            marginLeft: '10px',
            fontSize: '20px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}  
        >   
        {selected ? <>-</> : <>+</>}
        </button>
        {track.name} - ({track.artists[0].name})
      </li>
    </div>
  );

}

export default TrackComponent;
