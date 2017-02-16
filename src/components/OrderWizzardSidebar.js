'use strict';

import React from 'react';

import '../styles/OrderWizzardSidebar.css'

class OrderWizzardSidebar extends React.Component {
  render() {

    const { selectedEvent } = this.props;

    return (
      <div className="min-height slds-grid slds-grid--vertical-align-center slds-grid--align-center">
        <div className="slds-box">
          <h1>Selected event: { selectedEvent == null ? '' : selectedEvent.label  }</h1>
        </div>
      </div>
    );
  }
}

export default OrderWizzardSidebar;
