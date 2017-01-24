'use strict';

import React from 'react';
import { Link } from 'react-router'

import '../styles/MenuItem.css'

class MenuItem extends React.Component {
  render() {
    return (
      <li className="slds-context-bar__item">
        <Link className="slds-context-bar__label-action" to={this.props.path}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

MenuItem.displayName = 'MenuItem';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default MenuItem;
