'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles//Home.css');

class Home extends React.Component {
  render() {
    return (
      <h1>HOME</h1>
    );
  }
}

Home.displayName = 'Home';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default Home;
