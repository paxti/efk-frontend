'use strict';

import React from 'react'

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

export default TwoByTwoWrapper;
