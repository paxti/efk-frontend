'use strict';

import React from 'react';
import { Link } from 'react-router'

import TwoByTwoWrapper from './TwoByTwoWrapper'

import '../styles/MainGraphicDashboard.css'

class MainGraphicDashboard extends React.Component {
  render() {
    return (
      <div>
        <TwoByTwoWrapper />
      </div>
    );
  }
}

MainGraphicDashboard.displayName = 'MainGraphicDashboard';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default MainGraphicDashboard;
