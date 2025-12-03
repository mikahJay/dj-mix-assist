import React, { useState } from "react";

function SelectedTracksComponent({ selectedTracks }) {
  return (
    <ul>
      {selectedTracks.map((item, index) => (
        <li key={item}>item {index} is {item}</li>
      ))} 
    </ul>
  );

}

export default SelectedTracksComponent;
