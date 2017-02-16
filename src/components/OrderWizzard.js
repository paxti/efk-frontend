
'use strict';

import React from 'react';
import Stepzilla from 'react-stepzilla'

import OrderWizzardEvent from './OrderWizzardEvent'
import OrderWizzardConfiguration from '../components/OrderWizzardConfiguration'
import Home from './Home'
import OrderWizzardSidebar from '../components/OrderWizzardSidebar'

import OrderWizzardStore from '../stores/OrderWizzardStore'
import EventStore from '../stores/EventStore'

import OrderWizzardActions from '../actions/OrderWizzardActions'
import EventActions from '../actions/EventActions'

import {
  Col, Row, Grid, Lookup, Form, FieldSet, Button
} from 'react-lightning-design-system';

class OrderWizzard extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedEvent: null,
      events: []
    }
    this.onChange = this.onChange.bind(this);
    this.onEventChange = this.onEventChange.bind(this);
  }

  componentWillMount() {
    OrderWizzardStore.addChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
  }

  componentWillUnmount() {
    OrderWizzardStore.removeChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
  }

  onChange() {
    this.setState({
      selectedEvent: OrderWizzardStore.getSelectedEvent()
    });
  }

  onEventChange() {
    this.setState({
      events: EventStore.getEventForLookup()
    });
  }

  setSelectedEvent(selectedEvent){
    OrderWizzardActions.setEvent(selectedEvent)
  }

  render() {

    const steps = [
      {
        name: 'Select event', component: <OrderWizzardEvent
          onEventSelect={ this.setSelectedEvent }
          selectedEvent={ this.state.selectedEvent }
          events={ this.state.events }
        />
      },
      {
        name: 'Select configuration',
        component: <OrderWizzardConfiguration
          content="Step 2"
        />
      },
      {name: 'Options', component: <Home content="Step 3" />},
      {name: 'Rental', component: <Home content="Step 4" />},
      {name: 'Review', component: <Home content="Step 5" />}
    ];

    return (
      <Grid>
        <Row cols={7}>
          <Col cols={1}>
            <Home content="Test 1" />
          </Col>
          <Col cols={4}>
            <Stepzilla steps={steps}/>
          </Col>
          <Col cols={2}>
            <OrderWizzardSidebar selectedEvent={ this.state.selectedEvent } />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderWizzard;
