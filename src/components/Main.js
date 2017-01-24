'use strict';

import React from 'react';
import MainMenu from './MainMenu.js'
import MenuItem from './MenuItem.js'

import LoginStore from '../stores/LoginStore'

// require('normalize.css/normalize.css');
// require('styles/App.css');

class AppComponent extends React.Component {

  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
   return {
     userLoggedIn: LoginStore.isLoggedIn()
   };
 }

 componentDidMount() {
   this.changeListener = this._onChange.bind(this);
   LoginStore.addChangeListener(this.changeListener);
 }

 _onChange() {
   this.setState(this._getLoginState());
 }

 componentWillUnmount() {
   LoginStore.removeChangeListener(this.changeListener);
 }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth
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

AppComponent.defaultProps = { };

export default AppComponent;
