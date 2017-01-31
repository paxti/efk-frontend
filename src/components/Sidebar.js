'use strict';

import React from 'react';

import '../styles/Sidebar.css'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="slds-grid slds-grid--vertical slds-navigation-list--vertical">
        <ul>
          <li className="slds-is-active"><a className="slds-navigation-list--vertical__action slds-text-link--reset" aria-describedby="entity-header">Reports</a></li>
          <li><a className="slds-navigation-list--vertical__action slds-text-link--reset" aria-describedby="entity-header">Place order</a></li>
          <li><a className="slds-navigation-list--vertical__action slds-text-link--reset" aria-describedby="entity-header">Calendar</a></li>
          <li><a className="slds-navigation-list--vertical__action slds-text-link--reset" aria-describedby="entity-header">Home</a></li>
        </ul>
      </div>
    );
  }
}

Sidebar.displayName = 'Sidebar';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default Sidebar;
