'use strict';

import React from 'react';

import { Grid, Row, Col, Icon, Spinner } from 'react-lightning-design-system'
import EventsListItem from './EventsListItem'
import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

import styles from '../styles/EventsBox.css'


class EventsBox extends React.Component {

  constructor() {
    super();
    this.state = {
      events: [],
      isPending: false
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      events: EventStore.getEvents(),
      isPending: EventStore.isRequestPending()
    });
  }

  render() {


    let spinner = null;
    if (this.state.isPending) {
      spinner = <div><Spinner type='brand' size='medium' /></div>;
    } else {
      spinner = "";
    }

    return (
      <div className="event-box-border">
        <Grid>
          <Row>
            <Col>
              <div className="event-box-header">
                <div className="event-box-header-container">
                   <Icon category='standard' icon='event' className='slds-m-right--small' />
                   <div className="event-box-title">Current Events ({this.state.events.length})</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="event-box-body">
                <ul>
                  {this.state.events.slice(0, 2).map(function(event, index){
                    return  <EventsListItem key={event["id"]} name={event["city"]} info={event["venue"]} date={event["endDate"]} />;
                  })}
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
        {spinner}
      </div>
    );
  }
}

EventsBox.displayName = 'EventsBox';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default EventsBox;
