'use strict';

import React from 'react';

import '../styles/ThreeColumnsWrapper.css'

class ThreeColumnsWrapper extends React.Component {
  render() {
    // const { right, middle, left, leftParams } = this.props;
    return (
      <div className="slds-grid slds-grid--vertical-stretch">
        <div className="slds-col slds-large-size--2-of-12">
          <div>{this.props.right}</div>
        </div>
        <div className="slds-col slds-large-size--6-of-12">
          <div>{this.props.middle}</div>
        </div>
        <div className="slds-col slds-large-size--4-of-12">
          <div>{this.props.left}</div>
        </div>
      </div>
    )
  }
}

ThreeColumnsWrapper.displayName = 'ThreeColumnsWrapper';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default ThreeColumnsWrapper;
