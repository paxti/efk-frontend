'use strict';

import React from 'react';
import Stepzilla from 'react-stepzilla'

import OrderWizardEvent from './OrderWizardEvent'
import OrderWizardConfiguration from '../components/OrderWizardConfiguration'
import OrderWizardConfigurationDetails from '../components/OrderWizardConfigurationDetails'
import OrderWizardSidebar from '../components/OrderWizardSidebar'
import Navigation from '../components/Navigation'
import StandartTableWrapper from '../components/StandartTableWrapper'
import OrderWizardRentalTable from '../components/OrderWizardRentalTable'
import OrderWizardReview from '../components/OrderWizardReview'
import ConfigurationDetails from '../components/ConfigurationDetails'
import EventDetails from '../components/EventDetails'

import MasterDetails from '../components/MasterDetails'
import MasterDetailsEmpty from '../components/MasterDetailsEmpty'

import OrderWizardStore from '../stores/OrderWizardStore'
import EventStore from '../stores/EventStore'
import ConfigurationStore from '../stores/ConfigurationStore'

import OrderWizardActions from '../actions/OrderWizardActions'
import EventActions from '../actions/EventActions'
import ConfigurationActions from '../actions/ConfigurationActions'
import OrderActions from '../actions/OrderActions'

import {
  Col, Row, Grid, Lookup, Form, FieldSet, Button
} from 'react-lightning-design-system';

class OrderWizard extends React.Component {

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
    OrderWizardStore.addChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
    ConfigurationStore.addChangeListener(this.onConfigurationChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
    ConfigurationActions.receiveConfigurations();

    /**
     * TODO: Finde better place
     */
    OrderWizardActions.fetchCategoriesForStock();
  }

  componentWillUnmount() {
    OrderWizardStore.removeChangeListener(this.onChange);
    EventStore.removeChangeListener(this.onEventChange);
    ConfigurationStore.removeChangeListener(this.onConfigurationChange);
  }

  onChange() {
    this.setState({
      selectedEvent: OrderWizardStore.getSelectedEvent(),
      configurationDetails: OrderWizardStore.getSelectedConfiguration(),
      stockAvailability: OrderWizardStore.getStockAvailability(),
      stockAvalityProblems: OrderWizardStore.getStockAvailabilityProblems(),
      isStockLoading: OrderWizardStore.isStockLoading(),
      reservedFromInventory: OrderWizardStore.getReservedFromInventor(),
      rentals: OrderWizardStore.getRentals(),
      stockItemsInCategories: OrderWizardStore.getStockItemsForCategory(),
      itemsFromOptions: OrderWizardStore.getItemsFromOptions(),
      renatalFilter: OrderWizardStore.getRentalFilter(),
      stockItems: OrderWizardStore.getStockItemsForCategory(),
      categoriesForStock: OrderWizardStore.getCategoriesForStock(),
      stockItemsInCategory: OrderWizardStore.getStocItemsInCategory(),
      rentalModal: OrderWizardStore.getRentalModalState(),
      rentalModalObject: OrderWizardStore.getRentalModalObject(),
      allRentals: OrderWizardStore.getAllFromRental(),
      allReserved: OrderWizardStore.getAllFromInventory(),
      allEntitiesForNewOrder: OrderWizardStore.getAllEntitiesForOrder()
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
    OrderWizardActions.setEvent(selectedEvent)
  }

  /**
   * Callbacks for configuration page
   */

  onConfigurationSelect(selectedConfiguration, selectedEvent){
    OrderWizardActions.setConfiguration(selectedConfiguration, selectedEvent);
  }

  /**
   * Callback for availability page
   */

  onRentClick(stockAvalityProblems){
    OrderWizardActions.rentNecessary(stockAvalityProblems)
  }

  onOptionSelected(option){
    OrderWizardActions.addItemFromOptions(option)
  }

  onChangeRentailFilter(filter){
    OrderWizardActions.setRentalFilter(filter);
    OrderWizardActions.fetchStockItemForCategory(filter);
  }

  onRentShowModal(entity){
    OrderWizardActions.setRentalModelState(true, entity);
  }

  onRentalModalHide(){
    OrderWizardActions.setRentalModelState(false);
  }

  onRentalModalObjectUpdate(event){
    let obj = {};
    obj[event.target.id] = event.target.value
    OrderWizardActions.updateCurrentRentalModalObject(obj);
    event.preventDefault();
  }

  onAddToRent(reservedObject){
    OrderWizardActions.updateReservedFromInventory(reservedObject);
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
          sidebar={<OrderWizardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.configurationDetails}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <OrderWizardEvent
             onEventSelect={ this.onEventSelect }
             selectedEvent={ this.state.selectedEvent }
             events={ this.state.events }
           />

        </MasterDetailsEmpty >
      },
      {
        name: 'Select configuration',
        component: <MasterDetailsEmpty
          sidebar={<OrderWizardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.configurationDetails}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <OrderWizardConfiguration
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
        sidebar={<OrderWizardSidebar
          selectedEvent={ this.state.selectedEvent }
          selectedConfiguration={ this.state.configurationDetails}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>

        <OrderWizardConfigurationDetails
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
        sidebar={<OrderWizardSidebar
          selectedEvent={ this.state.selectedEvent }
          selectedConfiguration={ this.state.configurationDetails}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>

        <OrderWizardRentalTable
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
      component: <OrderWizardReview
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


export default OrderWizard;
