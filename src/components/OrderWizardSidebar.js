'use strict';

import React from 'react';

import styles from '../styles/OrderWizardSidebar.css'

class OrderWizardSidebar extends React.Component {
  render() {

    const { selectedEvent, selectedConfiguration, reservedFromInventory, rentals, selectedOptions, selectedGraphicsSet} = this.props;

    return (
      <div className={`${styles.min_height} slds-grid slds-grid--vertical-align-center slds-grid--align-center`}>
        <div className="slds_box">
          <h1>Selected event: { selectedEvent == null ? '' : selectedEvent.label }</h1>
          <h1>Selected configuration: { selectedConfiguration == null ? '' : selectedConfiguration.name }</h1>
          <h1>Selected graphics set: { selectedGraphicsSet == null ? '' : selectedGraphicsSet.name }</h1>

        <h1>So from inventory: { reservedFromInventory.length } items</h1>
          <h1>So from rented: { rentals.length } items</h1>

          <h1>Selcted options</h1>
          <ol type="1">
            {
              selectedOptions.map( (option) =>{
                return <li key={option.id}>-- {option.item.name}</li>
              })
            }
          </ol>

        </div>
      </div>
    );
  }
}

export default OrderWizardSidebar;
