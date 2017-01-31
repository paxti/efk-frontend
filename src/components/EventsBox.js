'use strict';

import React from 'react';

import { Grid, Row, Col, Icon } from 'react-lightning-design-system'
import EventsListItem from './EventsListItem'

import styles from '../styles/EventsBox.css'


class EventsBox extends React.Component {


  render() {
    return (
      <div className="event-box-border">
        <Grid>
          <Row>
            <Col>
              <div className="event-box-header">
                <div className="event-box-header-container">
                   <Icon category='standard' icon='event' className='slds-m-right--small' />
                   <div className="event-box-title">Current Events (2)</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="event-box-body">
                <ul>
                  <EventsListItem />
                  <EventsListItem />
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="event-box-footer"><a href="#">View all</a></div>
            </Col>
          </Row>
        </Grid>
      </div>



    );
  }
}

EventsBox.displayName = 'EventsBox';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default EventsBox;
