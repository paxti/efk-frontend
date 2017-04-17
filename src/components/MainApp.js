'use strict';

import React, { PropTypes as T } from 'react'
import MainMenu from './MainMenu.js'
import MenuItem from './MenuItem.js'

import styles from '../styles/MainApp.css'

class MainApp extends React.Component {

  static contextTypes = {
    router: T.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth
      })
    }

    return (
      <div className={styles.index}>
        <MainMenu appName="EFK">
          <MenuItem to="/home/dashboard" index={true}>Home</MenuItem>
          <MenuItem to="/home/make-order">Make order</MenuItem>
          <MenuItem to="/home/configurations">Configurations</MenuItem>
          <MenuItem to="/home/orders">Orders</MenuItem>
          <MenuItem to="/home/inventory">Inventory</MenuItem>
        </MainMenu>

        <div className={styles.main_app}> {children} </div>
      </div>
    );
  }
}

export default MainApp;
