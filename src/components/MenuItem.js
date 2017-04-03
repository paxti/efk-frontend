'use strict';

import React from 'react';
import { Link, IndexLink, withRouter} from 'react-router'

import styles from '../styles/MenuItem.css'

class MenuItem extends React.Component {
  render() {

    const { router } = this.context
    const { index, to, children, ...props } = this.props

    const isActive = props.router.isActive(to) ? 'slds-is-active' : '';

    return (
      <li className={`${isActive} + slds-context-bar__item`}>
        <Link className="slds-context-bar__label-action" to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }
}

MenuItem = withRouter(MenuItem)

export default MenuItem;
