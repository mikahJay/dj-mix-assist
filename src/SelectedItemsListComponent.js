import React from "react";
import PropTypes from "prop-types";

export default function SelectedItemListComponent({ items }) {
  if (items.length === 0) {
    return <p data-testid="no-selected">No items selected</p>;
  }

  return (
    <ul data-testid="selected-list">
      {items.map((item) => (
        <li key={item.id} style={{ padding: "8px", margin: "4px" }}> 
          {item.name} ✅
        </li>
      ))} 
    </ul>
  );  
}

SelectedItemListComponent.propTypes = { 
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    })  
  ).isRequired
};

