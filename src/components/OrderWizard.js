'use strict';

import React from 'react';

import Wizard from  './Wizard'
import TableWrapperWithHeader from './TableWrapperWithHeader'
import OrderWizardGraphicsSet from './OrderWizardGraphicsSet'


import OrderWizardEvent from './OrderWizardEvent'
import OrderWizardConfiguration from '../components/OrderWizardConfiguration'
import OrderWizardConfigurationDetails from '../components/OrderWizardConfigurationDetails'
import Navigation from './Navigation'
import OrderWizardReserve from './OrderWizardReserve'

import OrderWizardStore from '../stores/OrderWizardStore'
import EventStore from '../stores/EventStore'
import ConfigurationStore from '../stores/ConfigurationStore'

import OrderWizardActions from '../actions/OrderWizardActions'
import EventActions from '../actions/EventActions'
import ConfigurationActions from '../actions/ConfigurationActions'
import OrderActions from '../actions/OrderActions'

class OrderWizard extends React.Component {

  constructor() {
    super();
    this.state = {
      currentStep: 1,

      selectedEvent: null,
      events: [],

      selectedConfiguration: {},
      configurations: [],

      graphicsSets: [],
      selectedGraphicsSet: {},

      stockAvailability: { entities: [] },
      stockAvalityProblems: [],

      isStockLoading: true,
      rentals: [],
      reservedFromInventory: [],
      stockItemsInCategories: [],
      itemsFromOptions: [],
      renatalFilter: -1,
      reviewFilter: -1,
      stockItems: [],
      categoriesForStock: [],
      stockItemsInCategory: [],
      rentalModal: false,
      rentalModalObject: { item: {}},
      allRentals: [],
      allReserved: [],
      allEntitiesForNewOrder: [],
      stockItemsInCategoryWithReserved: [],
      reviewSourcesNames: [{name: 'All', id: -1}, {name: 'From inventory', id: 'inventory'}, {name: 'Rentals', id: 'rental'}],
      newOrderReviewFilteredData: [],

      inventoryInCategoryRequestStatus: true
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
      selectedConfiguration: OrderWizardStore.getSelectedConfiguration(),
      graphicsSets: OrderWizardStore.getGraphicsSets(),
      selectedGraphicsSet: OrderWizardStore.getSelectedGraphicsSet(),
      stockAvailability: OrderWizardStore.getStockAvailability(),
      stockAvalityProblems: OrderWizardStore.getStockAvailabilityProblems(),
      isStockLoading: OrderWizardStore.isStockLoading(),
      reservedFromInventory: OrderWizardStore.getReservedFromInventor(),
      rentals: OrderWizardStore.getRentals(),
      stockItemsInCategories: OrderWizardStore.getStockItemsForCategory(),
      itemsFromOptions: OrderWizardStore.getItemsFromOptions(),
      renatalFilter: OrderWizardStore.getRentalFilter(),
      reviewFilter: OrderWizardStore.getReviewFilter(),
      stockItems: OrderWizardStore.getStockItemsForCategory(),
      categoriesForStock: OrderWizardStore.getCategoriesForStock(),
      stockItemsInCategory: OrderWizardStore.getStockItemsInCategory(),
      rentalModal: OrderWizardStore.getRentalModalState(),
      rentalModalObject: OrderWizardStore.getRentalModalObject(),
      allRentals: OrderWizardStore.getAllFromRental(),
      allReserved: OrderWizardStore.getAllFromInventory(),
      allEntitiesForNewOrder: OrderWizardStore.getAllEntitiesForOrder(),
      stockItemsInCategoryWithReserved: OrderWizardStore.getStockItemsInCategoryWithReserved(),
      newOrderReviewFilteredData: OrderWizardStore.getNewOrderReviewFilteredData(),
      inventoryInCategoryRequestStatus: OrderWizardStore.getInventoryRequestStatus()
    });
  }

  onEventChange() {
    this.setState({
      events: EventStore.getEventForLookup()
    });
  }

  onConfigurationChange() {
    this.setState({
      configurations: ConfigurationStore.getConfigurations()
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

  onConfigurationSelect(selectedConfiguration){
    OrderWizardActions.setSelectedConfiguration(selectedConfiguration);
  }

  /**
   * Callbacks for graphics set page
   */
  onSelectGraphicsSet(selectedGraphicsSet){
    OrderWizardActions.setSelectedGraphicsSet(selectedGraphicsSet);
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

  onChangeReviewFilter(filter) {
    OrderWizardActions.setReviewFilter(filter);
  }

  onRentShowModal(entity){
    OrderWizardActions.setRentalModelState(true, entity);
  }

  onRentalModalClose(){
    OrderWizardActions.setRentalModelState(false, {item: {}});
  }

  onRentalAdjust(){
    OrderWizardActions.updateRental();
  }

  onChangeRentalAmount(entity){
    OrderWizardActions.updateCurrentRentalModalObject(Object.assign({}, entity));
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

    const headersForInventory = ['Name', 'Total', 'Reserved', 'Action'];

    const fieldsForInventory = [
      {type: 'field', path: 'item.name'},
      {type: 'field', path: 'amount'},
      {type: 'field', path: 'rented'},
      {type: 'button_action', title: 'Adjust amount', callback: this.onRentShowModal }
    ]

    const detailsForInventory = [
      { label: 'Total', title: 'sd34234', text: 'Total: ' + ' items' }
    ];

    const buttonsForInventoryModal = [
      {type: 'brand', label: 'Cancel', onClick: this.onRentalModalClose },
      {type: 'brand', label: 'Ok', onClick: this.onRentalAdjust }
    ]


    const headersForReviewStep = ["Name", "Amount" ,"Provider" ];
    const fieldsForReviewStep = [
      {type: "field", path: "name"},
      {type: "field", path: "amount"},
      {type: "field", path: "provider"}
    ];

    const detailsForReviewStep = [{
        label: "Reserved from inventory", title: "sd34234", text: "Total: " + this.state.allReserved.length + " items"
      },{
        label: "Mast be rented", title: "1111111111", text:  "Total: " + this.state.allRentals.length + " items"
      }
    ];

    const steps = [
      {
        name: 'Select event',
        component: <OrderWizardEvent
          onEventSelect={ this.onEventSelect }
          selectedEvent={ this.state.selectedEvent }
          events={ this.state.events } />
      },
      {
        name: 'Select configuration',
        component: <OrderWizardConfiguration
          configurations={ this.state.configurations }
          setSelectedEvent={ this.state.selectedEvent }
          onShowDetails={ this.onShowDetails }
          onSelectConfiguration={ this.onConfigurationSelect } />
      },
      {
        name: 'Select graphics set',
        component: <OrderWizardGraphicsSet
          selectedConfiguration={ this.state.selectedConfiguration }
          graphicsSets={ this.state.graphicsSets }
          onShowDetails={ this.onShowDetails }
          onSelectGraphicsSet={ this.onSelectGraphicsSet } />
      },
      {
        name: 'Configuration availability',
        component: <OrderWizardConfigurationDetails
          selectedConfiguration={this.state.selectedConfiguration }
          selectedEvent={ this.state.selectedEvent }
          stockAvalityProblems={ this.state.stockAvalityProblems }
          isStockLoading={ this.state.isStockLoading }
          onRentClick={ this.onRentClick }
          stockItemsInCategories={ this.state.stockItemsInCategories }
          itemsFromOptions={ this.state.itemsFromOptions }
          onOptionSelected={ this.onOptionSelected }/>
      },
      {
        name: 'Rental',
        filterId: this.state.renatalFilter,
        component: <OrderWizardReserve
          modalTitle={ 'Rent additional' }
          modalButtons={ buttonsForInventoryModal }
          modalStatus={ this.state.rentalModal }
          modalObject={ this.state.rentalModalObject }
          onChangeModal={ this.onChangeRentalAmount }
          tableLegend={ 'Reserve from inventory' }
          tableName={ 'Some name here' }
          tableDetails={ detailsForInventory }
          tableFields={ fieldsForInventory }
          tableHeaders={ headersForInventory }
          tableData={ this.state.stockItemsInCategoryWithReserved }
          isLoading={ this.state.inventoryInCategoryRequestStatus }
        />,
        navigation: <Navigation
           filterId={ this.state.renatalFilter }
           active={ true }
           names={ this.state.categoriesForStock }
           onChangeFilter={ this.onChangeRentailFilter } />
      },
      {
      name: 'Review',
      component: <TableWrapperWithHeader
          legend={ "Configurations" }
          title={ "Title 456" }
          details={ detailsForReviewStep }
          fields={ fieldsForReviewStep }
          headers={ headersForReviewStep }
          data={ this.state.newOrderReviewFilteredData }
          isLoading={ false } />,
      filterId: this.state.reviewFilter,
      navigation: <Navigation
         filterId={ this.state.reviewFilter }
         active={ true }
         names={ this.state.reviewSourcesNames }
         onChangeFilter={ this.onChangeReviewFilter } />
      }

  ];

  return (
      <Wizard
        steps={ steps }
        selectedEvent={ this.state.selectedEvent }
        selectedConfiguration={ this.state.selectedConfiguration }
        selectedGraphicsSet={ this.state.selectedGraphicsSet }
        rentals={ this.state.rentals }
        reservedFromInventory={ this.state.reservedFromInventory }
        selectedOptions={ this.state.itemsFromOptions } />
  )}
}


export default OrderWizard;
