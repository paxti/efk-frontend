'use strict';

import React from 'react';

import OrderWizardActions from '../actions/OrderWizardActions'

import StandartTableWrapper from '../components/StandartTableWrapper'
import ModalWrapper from '../components/ModalWrapper'
import PickListWrapper from '../components/PickListWrapper'

class OrderWizardConfigurationDetails extends React.Component {

  componentDidMount() {
    //TODO: Nessesary execute only ONCE
    OrderWizardActions.fetchConfigurationDetails(this.props.selectedConfiguration);
    OrderWizardActions.checkAvailability(this.props.selectedConfiguration, this.props.selectedEvent);
  }

  render() {

    const { selectedConfiguration, selectedEvent, stockAvalityProblems, stockItemsInCategories, itemsFromOptions, isStockLoading, onRentClick, onOptionSelected } = this.props;

    const headerNamesItems = ["Name", "Availiable amount" ,"Requiered amount", "Needs to be rented"]
    const fieldsToShow = [
        { type: "field", path: "item_name"},
        { type: "field", path: "avaliable_amount"},
        { type: "field", path: "required_amount"},
        { type: "field", path: "need_to_be_rented"},
    ];

    const isModalOpen = stockAvalityProblems.length != 0

    const title = isStockLoading ? "Looking for problems" : "Some items are not avaliable"

    const buttons = [
      {type: 'brand', label: 'Cancel', onClick: () => {}},
      {type: 'brand', label: 'Ok', onClick: () => {}},
      {type: 'brand', label: 'Rent', onClick: () => onRentClick(stockAvalityProblems) }
    ]

    return (
      <div>

        <PickListWrapper
          stockItemsInCategories={ stockItemsInCategories }
          onOptionSelected={ onOptionSelected }
          selectedOptions= {itemsFromOptions } />

        <ModalWrapper
          title={ title }
          size="large"
          buttons={ buttons }
          isLoading={ isStockLoading }
          showing={ isModalOpen }>

          <StandartTableWrapper
            fields={ fieldsToShow }
            headers={ headerNamesItems }
            data={ stockAvalityProblems } />

        </ModalWrapper>

      </div>
    );
  }
}

export default OrderWizardConfigurationDetails;
