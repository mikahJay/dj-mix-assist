import React from "react";

function TrackComponent({ track }) {
  return (
    <div id={track.href}>{track.name} - ({track.artists[0].name})</div>
  );
}

export default TrackComponent;
