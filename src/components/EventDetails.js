'use strict';

import React from 'react';

import styles from '../styles/EventDetails.css'

/**
 * EventDetails component
 */

class EventDetails extends React.Component {
  render() {

    const { content, eventDetails } = this.props;

    return (
      <div>
        <br></br><h1>Event info: </h1><br></br>
        <h1>Event Name: {eventDetails.name}</h1>
        <h1>Event City: {eventDetails.city}</h1>
        <h1>Event Venue: {eventDetails.venue}</h1>
        <h1>Stare date: {eventDetails.startDate}</h1>
        <h1>End date: {eventDetails.endDate}</h1>
      </div>
    );
  }
}

export default EventDetails;
