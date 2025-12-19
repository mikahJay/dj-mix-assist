import React from "react";
import PropTypes from "prop-types";

export default function SelectedItemsListComponent({ items }) {
  if (!items || items.length === 0) {
    return <p data-testid="no-selected-text">No items selected</p>;
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

SelectedItemsListComponent.propTypes = { 
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    })  
  ).isRequired
};

