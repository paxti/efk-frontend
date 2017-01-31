'use strict';

import React from 'react';

import { Grid, Row, Col, Icon } from 'react-lightning-design-system'

import '../styles/EventsListItem.css'


class EventsListItem extends React.Component {


  render() {
    return (
      <li className="event-list-item">
        <div className="event-list-item-event-name">Event name</div>
        <div>01/01/2017</div>
        <div>Additional info</div>
      </li>
    );
  }
}

EventsListItem.displayName = 'EventsListItem';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default EventsListItem;
