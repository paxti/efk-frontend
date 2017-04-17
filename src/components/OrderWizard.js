'use strict';

import React from 'react';

import Wizard from  './Wizard'
import ModalWrapperReserveForm from './ModalWrapperReserveForm'
import TableWrapperWithHeader from './TableWrapperWithHeader'
import WizardStepContainer from './WizardStepContainer'

import OrderWizardEvent from './OrderWizardEvent'
import OrderWizardConfiguration from '../components/OrderWizardConfiguration'
import OrderWizardConfigurationDetails from '../components/OrderWizardConfigurationDetails'
import OrderWizardSidebar from './OrderWizardSidebar'
import Navigation from './Navigation'
import ConfigurationDetails from './ConfigurationDetails'

import MasterDetails from './MasterDetails'
import MasterDetailsEmpty from './MasterDetailsEmpty'

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

      selectedConfiguration: null,
      configurations: [],

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
      newOrderReviewFilteredData: []
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
      newOrderReviewFilteredData: OrderWizardStore.getNewOrderReviewFilteredData()
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

  onConfigurationSelect(selectedConfiguration){
    OrderWizardActions.setSelectedConfiguration(selectedConfiguration);
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

    const headers = ['Name', 'Total', 'Reserved', 'Action'];

    const fields = [
      {type: 'field', path: 'item.name'},
      {type: 'field', path: 'amount'},
      {type: 'field', path: 'rented'},
      {type: 'button_action', title: 'Adjust amount', callback: this.onRentShowModal }
    ]

    const details = [
      { label: "Total", title: "sd34234", text: "Total: " + " items" }
    ];

    const buttons = [
      {type: 'brand', label: 'Cancel', onClick: this.onRentalModalClose },
      {type: 'brand', label: 'Ok', onClick: this.onRentalAdjust },
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
        name: 'Select event', component: <MasterDetailsEmpty
          sidebar={<OrderWizardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.selectedConfiguration}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <WizardStepContainer>
            <OrderWizardEvent
               onEventSelect={ this.onEventSelect }
               selectedEvent={ this.state.selectedEvent }
               events={ this.state.events } />
           </WizardStepContainer>
        </MasterDetailsEmpty >

      },
      {
        name: 'Select configuration',
        component: <MasterDetailsEmpty
          sidebar={<OrderWizardSidebar
            selectedEvent={ this.state.selectedEvent }
            selectedConfiguration={ this.state.selectedConfiguration}
            rentals={ this.state.rentals }
            reservedFromInventory={ this.state.reservedFromInventory }
            selectedOptions={ this.state.itemsFromOptions } />
          }>

          <WizardStepContainer>
            <OrderWizardConfiguration
              configurations={ this.state.configurations }
              setSelectedEvent={ this.state.selectedEvent }
              onShowDetails={ this.onShowDetails }
              onSelectConfiguration={ this.onConfigurationSelect } />
          </WizardStepContainer>

        </MasterDetailsEmpty >
      },
      {
      name: 'Configuration availability',
      component: <MasterDetailsEmpty
        sidebar={<OrderWizardSidebar
          selectedEvent={ this.state.selectedEvent }
          selectedConfiguration={ this.state.selectedConfiguration}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>
          <WizardStepContainer>
            <OrderWizardConfigurationDetails
              selectedConfiguration={this.state.selectedConfiguration}
              selectedEvent={ this.state.selectedEvent }
              stockAvalityProblems={ this.state.stockAvalityProblems }
              isStockLoading={ this.state.isStockLoading }
              onRentClick={ this.onRentClick }
              stockItemsInCategories={ this.state.stockItemsInCategories }
              itemsFromOptions={ this.state.itemsFromOptions }
              onOptionSelected={ this.onOptionSelected }
            />
          </WizardStepContainer>

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
          selectedConfiguration={ this.state.selectedConfiguration}
          rentals={ this.state.rentals }
          reservedFromInventory={ this.state.reservedFromInventory }
          selectedOptions={ this.state.itemsFromOptions } />
        }>
          <WizardStepContainer>

          <div>
            <ModalWrapperReserveForm
              title={ "Rent additional" }
              size="medium"
              buttons={ buttons }
              isLoading={ false }
              isShowing={ this.state.rentalModal }
              entity={ this.state.rentalModalObject }
              onChange={ this.onChangeRentalAmount } />

            <TableWrapperWithHeader
              legend={ "Configurations" }
              title={ "Title 456" }
              details={ details }
              fields={ fields }
              headers={ headers }
              data={ this.state.stockItemsInCategoryWithReserved }
              isLoading={ false } />
            </div>

          </WizardStepContainer>

      </MasterDetails>
      },
      {
      name: 'Review',
      component: <MasterDetails
        content="Step 4"
        filterId={ this.state.reviewFilter }
        navigation={<Navigation
           filterId={ this.state.reviewFilter }
           active={ true }
           names={ this.state.reviewSourcesNames }
           onChangeFilter={ this.onChangeReviewFilter }
        />}
        sidebar={<div></div> }>
          <WizardStepContainer>

          <div>
            <TableWrapperWithHeader
              legend={ "Configurations" }
              title={ "Title 456" }
              details={ detailsForReviewStep }
              fields={ fieldsForReviewStep }
              headers={ headersForReviewStep }
              data={ this.state.newOrderReviewFilteredData }
              isLoading={ false } />
            </div>

          </WizardStepContainer>
      </MasterDetails>
      }

  ];

  return (
    <div>
      <Wizard steps={steps} />
    </div>
  )}
}


export default OrderWizard;
