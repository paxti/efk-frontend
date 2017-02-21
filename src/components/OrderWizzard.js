'use strict';

import React from 'react';
import Stepzilla from 'react-stepzilla'

import OrderWizzardEvent from './OrderWizzardEvent'
import OrderWizzardConfiguration from '../components/OrderWizzardConfiguration'
import OrderWizzardConfigurationDetails from '../components/OrderWizzardConfigurationDetails'
import Home from './Home'
import OrderWizzardSidebar from '../components/OrderWizzardSidebar'

import OrderWizzardStore from '../stores/OrderWizzardStore'
import EventStore from '../stores/EventStore'
import ConfigurationStore from '../stores/ConfigurationStore'

import OrderWizzardActions from '../actions/OrderWizzardActions'
import EventActions from '../actions/EventActions'
import ConfigurationActions from '../actions/ConfigurationActions'

import {
  Col, Row, Grid, Lookup, Form, FieldSet, Button
} from 'react-lightning-design-system';

class OrderWizzard extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedEvent: null,
      events: [],
      configurations: [],
      configurationDetails: null,
      stockAvailability: { entities: [] },
      stockAvalityProblems: [],
      isStockLoading: true,
      rentals: [],
      reservedFromInventory: []
    }
    this.onChange = this.onChange.bind(this);
    this.onEventChange = this.onEventChange.bind(this);
    this.onConfigurationChange = this.onConfigurationChange.bind(this);
  }

  componentWillMount() {
    OrderWizzardStore.addChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
    ConfigurationStore.addChangeListener(this.onConfigurationChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
    ConfigurationActions.recieveConfigurations();
  }

  componentWillUnmount() {
    OrderWizzardStore.removeChangeListener(this.onChange);
    EventStore.removeChangeListener(this.onEventChange);
    ConfigurationStore.removeChangeListener(this.onConfigurationChange);
  }

  onChange() {
    this.setState({
      selectedEvent: OrderWizzardStore.getSelectedEvent(),
      configurationDetails: OrderWizzardStore.getSelectedConfiguration(),
      stockAvailability: OrderWizzardStore.getStockAvailability(),
      stockAvalityProblems: OrderWizzardStore.getStockAvailabilityProblems(),
      isStockLoading: OrderWizzardStore.isStockLoading(),
      reservedFromInventory: OrderWizzardStore.getReservedFromInventor(),
      rentals: OrderWizzardStore.getRentals()
    });
  }

  onEventChange() {
    this.setState({
      events: EventStore.getEventForLookup()
    });
  }

  onConfigurationChange() {
    this.setState({
      configurations: ConfigurationStore.getConfigurations(),
    });
  }

  onShowDetails(id){
    return "";
  }

  /**
   * Callbacks for event page
   */

  onEventSelect(selectedEvent){
    OrderWizzardActions.setEvent(selectedEvent)
  }

  /**
   * Callbacks for configuration page
   */

  onConfigurationSelect(selectedConfiguration, selectedEvent){
    OrderWizzardActions.setConfiguration(selectedConfiguration, selectedEvent);
  }

  /**
   * Callback for availability page
   */

  onRentClick(stockAvalityProblems){
    OrderWizzardActions.rentNecessary(stockAvalityProblems)
  }


  render() {

    const steps = [
      {
        name: 'Select event', component: <OrderWizzardEvent
          onEventSelect={ this.onEventSelect }
          selectedEvent={ this.state.selectedEvent }
          events={ this.state.events }
        />
      },
      {
        name: 'Select configuration',
        component: <OrderWizzardConfiguration
          configurations={ this.state.configurations }
          setSelectedEvent={ this.state.selectedEvent }
          onShowDetails={ this.onShowDetails }
          onSelectConfiguration={ this.onConfigurationSelect }
        />
    },
    {
      name: 'Configuration availability',
      component: <OrderWizzardConfigurationDetails
        configuration={this.state.configurationDetails}
        selectedEvent={ this.state.selectedEvent }
        stockAvalityProblems={ this.state.stockAvalityProblems }
        isStockLoading={ this.state.isStockLoading }
        onRentClick={ this.onRentClick }
      />
    },
    {name: 'Rental', component: <Home content="Step 4" />},
    {name: 'Review', component: <Home content="Step 5" />}
  ];

  return (
    <Grid color>
      <Row cols={7}>
        <Col cols={1}>
          <Home content="Test 1" />
        </Col>
        <Col cols={4}>
          <Stepzilla steps={steps}/>
        </Col>
        <Col cols={2}>
          <OrderWizzardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.configurationDetails}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory } />
        </Col>
      </Row>
    </Grid>
  )}
}


export default OrderWizzard;
