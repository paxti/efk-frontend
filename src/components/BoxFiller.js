'use strict';

import React from 'react';

import '../styles/BoxFiller.css'

class BoxFiller extends React.Component {
  render() {
    return (
      <div className="box-border">
      	<div className="box-header">
      		<div className="box-title">Title</div>
      		<div className="box-sub-title">Sub-title</div>
      	</div>

      	<div className="box-footer"><a href="#">View report</a></div>
      </div>
    );
  }
}

BoxFiller.displayName = 'BoxFiller';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default BoxFiller;
