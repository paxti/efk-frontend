'use strict';

import React from 'react';

import OrderWizardActions from '../actions/OrderWizardActions'

import StandartTableWrapper from '../components/StandartTableWrapper'
import ModalWrapper from '../components/ModalWrapper'
import PickListWrapper from '../components/PickListWrapper'

import styles from '../styles/OrderWizardConfigurationDetails.css'

class OrderWizardConfigurationDetails extends React.Component {

  componentDidMount() {
    OrderWizardActions.checkAvailability(this.props.configuration, this.props.selectedEvent);
    OrderWizardActions.fetchAllStockItemForCategory(this.props.configuration.category_set.category_entities);
  }

  render() {

    const { configuration, selectedEvent, stockAvalityProblems, stockItemsInCategories, itemsFromOptions, isStockLoading, onRentClick, onOptionSelected } = this.props;

    const headerNamesItems = ["Name", "Availiable amount" ,"Requiered amount", "Needs to be rented"]
    const fieldsToShow = ["item_name", "avaliable_amount", "required_amount", "need_to_be_rented"]

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
          selectedOptions= {itemsFromOptions }
        />

        <ModalWrapper
          title={ title }
          size="large"
          buttons={ buttons }
          isLoading={ isStockLoading }
          showing={ isModalOpen }>

          <StandartTableWrapper
            fields={ fieldsToShow }
            headers={ headerNamesItems }
            data={ stockAvalityProblems }
          />
        </ModalWrapper>

      </div>
    );
  }
}

export default OrderWizardConfigurationDetails;
