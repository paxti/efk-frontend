'use strict';

import React from 'react';
import { Link } from 'react-router'

import '../styles/Home.css'

class Home extends React.Component {
  render() {

    const { content } = this.props;

    return (
      <div className="min-height slds-grid slds-grid--vertical-align-center slds-grid--align-center">
        <div className="slds-box">
          <h1>{content}</h1>
        </div>
      </div>
    );
  }
}

Home.displayName = 'Home';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default Home;
