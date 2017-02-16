'use strict';

import React from 'react';

import styles from '../styles/Home.css'

class Home extends React.Component {
  render() {

    const { content } = this.props;

    return (
      <div className={styles.min_height} className="slds-grid slds-grid--vertical-align-center slds-grid--align-center">
        <div className={styles.slds_box}>
          <h1>{content}</h1>
        </div>
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
