'use strict';

import React from 'react';

import styles from '../styles/ThreeColumnsWrapper.css'

class ThreeColumnsWrapper extends React.Component {
  render() {

    let children = null;
    if (this.props.middle_children) {
      children = React.cloneElement(this.props.middle, {
        children: this.props.middle_children,
        sub_title: this.props.sub_title
      })
    }

    // const { right, middle, left, leftParams } = this.props;
    return (
      <div className="slds-grid slds-grid--vertical-stretch">
        <div className="slds-col slds-large-size--2-of-12">
          <div>{this.props.right}</div>
        </div>
        <div className="slds-col slds-large-size--6-of-12">
          <div>{children}</div>
        </div>
        <div className="slds-col slds-large-size--4-of-12">
          <div>{this.props.left}</div>
        </div>
      </div>
    )
  }
}

export default ThreeColumnsWrapper;
