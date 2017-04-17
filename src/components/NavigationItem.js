'use strict';

import React from 'react';


class NavigationItem extends React.Component {
  render() {

    const { name, active, onClick } = this.props;

    return (
      <li className={ active ? 'slds-is-active' : null }>
        <a onClick={ onClick } className="slds-navigation-list--vertical__action slds-text-link--reset">
          {name}
        </a>
      </li>
    );
  }
}

export default NavigationItem;
