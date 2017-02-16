'use strict';

import React from 'react';

import styles from '../styles/BoxFiller.css'

class BoxFiller extends React.Component {
  render() {
    return (
      <div className={styles.box_border}>
      	<div className={styles.box_header}>
      		<div className={styles.box_title}>Title</div>
      		<div className={styles.box_sub_title}>Sub-title</div>
      	</div>

      	<div className={styles.box_footer}><a href="#">View report</a></div>
      </div>
    );
  }
}

BoxFiller.displayName = 'BoxFiller';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default BoxFiller;
