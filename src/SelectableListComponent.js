import styles from './styles';
import React, { useState } from 'react';

// Component: SelectableList
function SelectableListComponent({ items, selectedItems, onToggle }) {
  return (
    <div style={styles.listContainer}>
      <h3>All Items</h3>
      <ul style={styles.ul}>
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);
          console.log(item.id);
          return (
            <li
              key={item.id}
              style={{
                ...styles.li,
                backgroundColor: isSelected ? "#d1e7dd" : "#f8f9fa",
                cursor: "pointer",
              }}
              onClick={() => onToggle(item)}
            >
              {item.name} ({item.artists[0].name}) {isSelected && "✅"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectableListComponent;
