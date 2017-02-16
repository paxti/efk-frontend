'use strict';

import React, { PropTypes as T } from 'react'

class AppComponent extends React.Component {

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
      <div className="index"> {children} </div>
    );
  }
}


export default AppComponent;
