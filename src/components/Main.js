require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import MainMenu from './MainMenu.js'
import MenuItem from './MenuItem.js'


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <MainMenu appName="EFK">
          <MenuItem name="Home" title="Home" />
          <MenuItem name="Configurations" title="Configurations" />
          <MenuItem name="Orders" title="Orders" path="/orders"/>
          <MenuItem name="Inventory" title="Inventory" path="/inventory" />
        </MainMenu>

        <div className="main-area"> {this.props.children} </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
