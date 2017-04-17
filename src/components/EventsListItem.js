'use strict';

import React from 'react';

import styles from '../styles/EventsListItem.css'

class EventsListItem extends React.Component {
  render() {

    const {name, date, info} = this.props;

    return (
      <li className={styles.event_list_item}>
        <div className={styles.event_list_item_event_name}>{name}</div>
        <div>{date}</div>
        <div>{info}</div>
      </li>
    );
  }
}

export default EventsListItem;
