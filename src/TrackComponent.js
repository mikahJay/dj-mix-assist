import React from "react";
import ApiWrapper from './ApiWrapper';

function TrackComponent({ track }) {
  return (
    <div id={track.id}>{track.name} - ({track.artists[0].name})</div>
  );
}

export default TrackComponent;
