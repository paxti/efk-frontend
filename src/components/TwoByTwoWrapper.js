'use strict';

import React from 'react'

import '../styles/TwoByTwoWrapper.css'

import BoxFiller from './BoxFiller'

class TwoByTwoWrapper extends React.Component {
  render() {
    return (
      <div>
        <div className="slds-grid">
          <div className="slds-col">
            <BoxFiller />
            <BoxFiller />
          </div>
          <div className="slds-col">
            <BoxFiller />
            <BoxFiller />
          </div>
        </div>
      </div>
    )
  }
}

TwoByTwoWrapper.displayName = 'TwoByTwoWrapper';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default TwoByTwoWrapper;
