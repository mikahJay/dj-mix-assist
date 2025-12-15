import styles from './styles';
import PropTypes from 'prop-types';
import React from 'react';

// Component: SelectableList
function SelectableListComponent({ items, onToggle }) {
  
  return (
    <div style={styles.listContainer}>
      <h3>All Items</h3>
      <ul style={styles.ul}>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              data-testid={'selectable-item-' + item.id}
              style={{
                ...styles.li,
                backgroundColor: item.selected ? "#d1e7dd" : "#f8f9fa",
                cursor: "pointer",
              }}
              onClick={() => onToggle(item.id)}
            >
              {item.name} ({item.artists[0].name}) {item.selected && "✅"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SelectableListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired
};

export default SelectableListComponent;
