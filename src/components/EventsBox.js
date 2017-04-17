'use strict';

import React from 'react';

import { Grid, Row, Col, Icon, Spinner } from 'react-lightning-design-system'
import EventsListItem from './EventsListItem'
import NetworkLoader from './NetworkLoader'

import styles from '../styles/EventsBox.css'


class EventsBox extends React.Component {

  render() {

    const { events, isLoading } = this.props;

    return (
      <NetworkLoader isLoading={ isLoading }>
        <div className={styles.event_box_border}>
          <Grid>
            <Row>
              <Col>
                <div className={styles.event_box_header}>
                  <div className={styles.event_box_header_container}>
                     <Icon category='standard' icon='event' className='slds-m-right--small' />
                     <div className={styles.event_box_title}>Current Events ({ events.length })</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.event_box_body}>
                  <ul>
                    {events.slice(0, 2).map(function(event, index){
                      return  <EventsListItem key={event["id"]} name={event["city"]} info={event["venue"]} date={event["endDate"]} />;
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.event_box_footer}><a href="#">View all</a></div>
              </Col>
            </Row>
          </Grid>
        </div>
      </NetworkLoader>
    );
  }
}

export default EventsBox;
