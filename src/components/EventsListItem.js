'use strict';

import React from 'react';

import styles from '../styles/EventsListItem.css'

class EventsListItem extends React.Component {
  render() {
    return (
      <li className={styles.event_list_item}>
        <div className={styles.event_list_item_event_name}>
          {this.props.name}
        </div>
        <div>{this.props.date}</div>
        <div>{this.props.info}</div>
      </li>
    );
  }
}

export default EventsListItem;
