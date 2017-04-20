'use strict';

import React from 'react';
import { Spinner } from 'react-lightning-design-system'

import styles from '../styles/NetworkLoader.css'

class NetworkLoader extends React.Component {
  render() {

    const { isLoading, children } = this.props;

    return (
      <div className={styles.restrict_loader}>
        { children }
        { isLoading && <Spinner type='brand' size='medium' /> }
      </div>
    );
  }
}

NetworkLoader.PropTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired
}

export default NetworkLoader;
