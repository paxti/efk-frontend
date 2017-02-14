'use strict';

import React from 'react';

import { Grid, Row, Col, Icon } from 'react-lightning-design-system'

import '../styles/EventsListItem.css'


class EventsListItem extends React.Component {


  render() {
    return (
      <li className="event-list-item">
        <div className="event-list-item-event-name">{this.props.name}</div>
        <div>{this.props.date}</div>
        <div>{this.props.info}</div>
      </li>
    );
  }
}

EventsListItem.displayName = 'EventsListItem';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default EventsListItem;
