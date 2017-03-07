'use strict';

import React from 'react';
import Stepzilla from 'react-stepzilla'

import OrderWizzardEvent from './OrderWizzardEvent'
import OrderWizzardConfiguration from '../components/OrderWizzardConfiguration'
import OrderWizzardConfigurationDetails from '../components/OrderWizzardConfigurationDetails'
import OrderWizzardSidebar from '../components/OrderWizzardSidebar'
import Navigation from '../components/Navigation'
import StandartTableWrapper from '../components/StandartTableWrapper'
import OrderWizzardRentalTable from '../components/OrderWizzardRentalTable'
import OrderWizzardReview from '../components/OrderWizzardReview'
import ConfigurationDetails from '../components/ConfigurationDetails'
import EventDetails from '../components/EventDetails'

import MasterDetails from '../components/MasterDetails'
import MasterDetailsEmpty from '../components/MasterDetailsEmpty'

import OrderWizzardStore from '../stores/OrderWizzardStore'
import EventStore from '../stores/EventStore'
import ConfigurationStore from '../stores/ConfigurationStore'

import OrderWizzardActions from '../actions/OrderWizzardActions'
import EventActions from '../actions/EventActions'
import ConfigurationActions from '../actions/ConfigurationActions'
import OrderActions from '../actions/OrderActions'

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
      reservedFromInventory: [],
      stockItemsInCategories: [],
      itemsFromOptions: [],
      renatalFilter: -1,
      stockItems: [],
      categoriesForStock: [],
      stockItemsInCategory: [],
      rentalModal: false,
      rentalModalObject: {},
      allRentals: [],
      allReserved: [],
      allEntitiesForNewOrder: []

    }
    this.onChange = this.onChange.bind(this);
    this.onEventChange = this.onEventChange.bind(this);
    this.onConfigurationChange = this.onConfigurationChange.bind(this);
  }


  /**
   * Store listeners
   */

  componentWillMount() {
    OrderWizzardStore.addChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
    ConfigurationStore.addChangeListener(this.onConfigurationChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
    ConfigurationActions.receiveConfigurations();

    /**
     * TODO: Finde better place
     */
    OrderWizzardActions.fetchCategoriesForStock();
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
      rentals: OrderWizzardStore.getRentals(),
      stockItemsInCategories: OrderWizzardStore.getStockItemsForCategory(),
      itemsFromOptions: OrderWizzardStore.getItemsFromOptions(),
      renatalFilter: OrderWizzardStore.getRentalFilter(),
      stockItems: OrderWizzardStore.getStockItemsForCategory(),
      categoriesForStock: OrderWizzardStore.getCategoriesForStock(),
      stockItemsInCategory: OrderWizzardStore.getStocItemsInCategory(),
      rentalModal: OrderWizzardStore.getRentalModalState(),
      rentalModalObject: OrderWizzardStore.getRentalModalObject(),
      allRentals: OrderWizzardStore.getAllFromRental(),
      allReserved: OrderWizzardStore.getAllFromInventory(),
      allEntitiesForNewOrder: OrderWizzardStore.getAllEntitiesForOrder()
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

  onOptionSelected(option){
    OrderWizzardActions.addItemFromOptions(option)
  }

  onChangeRentailFilter(filter){
    OrderWizzardActions.setRentalFilter(filter);
    OrderWizzardActions.fetchStockItemForCategory(filter);
  }

  onRentShowModal(entity){
    OrderWizzardActions.setRentalModelState(true, entity);
  }

  onRentalModalHide(){
    OrderWizzardActions.setRentalModelState(false);
  }

  onRentalModalObjectUpdate(event){
    let obj = {};
    obj[event.target.id] = event.target.value
    OrderWizzardActions.updateCurrentRentalModalObject(obj);
    event.preventDefault();
  }

  onAddToRent(reservedObject){
    OrderWizzardActions.updateReservedFromInventory(reservedObject);
  }

  putNewOrder(event, configuration, entities){

    console.log(configuration);

    let order = {
      event: event.sfid,
      configuration: configuration.sfid,
      entities: entities
    };

    console.log(order);

    OrderActions.putOrder({order: order});
  }

  render() {

    const steps = [
      {
        name: 'Select event', component: <MasterDetailsEmpty
          sidebar={<OrderWizzardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.configurationDetails}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <OrderWizzardEvent
             onEventSelect={ this.onEventSelect }
             selectedEvent={ this.state.selectedEvent }
             events={ this.state.events }
           />

        </MasterDetailsEmpty >
      },
      {
        name: 'Select configuration',
        component: <MasterDetailsEmpty
          sidebar={<OrderWizzardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.configurationDetails}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <OrderWizzardConfiguration
            configurations={ this.state.configurations }
            setSelectedEvent={ this.state.selectedEvent }
            onShowDetails={ this.onShowDetails }
            onSelectConfiguration={ this.onConfigurationSelect }
          />

        </MasterDetailsEmpty >
    },
    {
      name: 'Configuration availability',
      component: <MasterDetailsEmpty
        sidebar={<OrderWizzardSidebar
          selectedEvent={ this.state.selectedEvent }
          selectedConfiguration={ this.state.configurationDetails}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>

        <OrderWizzardConfigurationDetails
          configuration={this.state.configurationDetails}
          selectedEvent={ this.state.selectedEvent }
          stockAvalityProblems={ this.state.stockAvalityProblems }
          isStockLoading={ this.state.isStockLoading }
          onRentClick={ this.onRentClick }
          stockItemsInCategories={ this.state.stockItemsInCategories }
          itemsFromOptions={this.state.itemsFromOptions}
          onOptionSelected={ this.onOptionSelected }
        />

      </MasterDetailsEmpty >
    },
    {
      name: 'Rental',
      component: <MasterDetails
        content="Step 4"
        filterId={ this.state.renatalFilter }
        navigation={<Navigation
           filterId={ this.state.renatalFilter }
           active={ true }
           names={ this.state.categoriesForStock }
           onChangeFilter={ this.onChangeRentailFilter }
        />}
        sidebar={<OrderWizzardSidebar
          selectedEvent={ this.state.selectedEvent }
          selectedConfiguration={ this.state.configurationDetails}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>

        <OrderWizzardRentalTable
          data={ this.state.stockItemsInCategory }
          reservedFromInventory={ this.state.reservedFromInventory }
          rentalModalObject={ this.state.rentalModalObject }
          rentalModalState={ this.state.rentalModal }
          onAddToRent={ this.onAddToRent }
          onRentShowModal={ this.onRentShowModal }
          onRentHideModal={ this.onRentalModalHide }
          onRentalModalObjectUpdate={ this.onRentalModalObjectUpdate }
        />

      </MasterDetails>
    },
    {
      name: 'Review',
      component: <OrderWizzardReview
        allEntities={ this.state.allEntitiesForNewOrder }
        rentals={ this.state.allRentals }
        inventory={ this.state.allReserved }
        onPutOrder={ this.putNewOrder }
        selectedEvent={ this.state.selectedEvent }
        selectedConfiguration={ this.state.configurationDetails }
        event={ <EventDetails eventDetails={ this.state.selectedEvent } /> }
        configuration={ <ConfigurationDetails configurationDetails={ this.state.configurationDetails }/> }
      />
    }
  ];

  return (
    <Stepzilla steps={steps}/>
  )}
}


export default OrderWizzard;
