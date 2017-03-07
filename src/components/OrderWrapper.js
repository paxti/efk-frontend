'use strict';

import React from 'react';

import styles from '../styles/OrderWrapper.css'

class OrderWrapper extends React.Component {

  render() {

    const { children } = this.props;

    return (
      <div>{ children }</div>
    );
  }
}

export default OrderWrapper;
