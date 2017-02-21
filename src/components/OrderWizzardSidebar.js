'use strict';

import React from 'react';

import styles from '../styles/OrderWizzardSidebar.css'

class OrderWizzardSidebar extends React.Component {
  render() {

    const { selectedEvent, selectedConfiguration, reservedFromInventory, rentals} = this.props;

    return (
      <div className={`${styles.min_height} + slds-grid slds-grid--vertical-align-center slds-grid--align-center`}>
        <div className="slds_box">
          <h1>Selected event: { selectedEvent == null ? '' : selectedEvent.label }</h1>
          <h1>Selected configuration: { selectedConfiguration == null ? '' : selectedConfiguration.name }</h1>
          <h1>So from inventory: { reservedFromInventory.length } items</h1>
          <h1>So from rented: { rentals.length } items</h1>
        </div>
      </div>
    );
  }
}

export default OrderWizzardSidebar;
