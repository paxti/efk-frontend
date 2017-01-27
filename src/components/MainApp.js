'use strict';

import React, { PropTypes as T } from 'react'
import MainMenu from './MainMenu.js'
import MenuItem from './MenuItem.js'
//
// import LoginStore from '../stores/LoginStore'

// require('normalize.css/normalize.css');
// require('styles/App.css');

class MainApp extends React.Component {

  static contextTypes = {
    router: T.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div className="index">
        <MainMenu appName="EFK">
          <MenuItem name="Home" title="Home" path="/home" />
          <MenuItem name="Configurations" title="Configurations" />
          <MenuItem name="Orders" title="Orders" path="/orders"/>
          <MenuItem name="Inventory" title="Inventory" path="/inventory" />
        </MainMenu>

        <div className="main-area"> {children} </div>
      </div>
    );
  }
}


export default MainApp;
