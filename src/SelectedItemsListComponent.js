import React from 'react';
import styles from './styles';

// Component: SelectedItemsListComponent
function SelectedItemsListComponent({ selectedItems }) {
  return (
    <div style={styles.listContainer}>
      <h3>Selected Items</h3>
      {selectedItems.length === 0 ? (
        <p style={{ color: "#6c757d" }}>No items selected</p>
      ) : ( 
        <ul style={styles.ul}>
          {selectedItems.map((item) => (
            <li key={item.id} style={styles.li}>
              {item.name} - ({item.artists ? item.artists[0].name : ''})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectedItemsListComponent;
