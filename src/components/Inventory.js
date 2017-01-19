'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles//Inventory.css');

class Inventory extends React.Component {
  render() {
    return (
      <h1>Inventory here</h1>
    );
  }
}

Inventory.displayName = 'Inventory';
Inventory.className = 'Inventory';

// Uncomment properties you need
// InventoryComponent.propTypes = {};
// InventoryComponent.defaultProps = {};

export default Inventory;
