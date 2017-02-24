'use strict';

import React from 'react';

import OrderWizzardActions from '../actions/OrderWizzardActions'

import StandartTableWrapper from '../components/StandartTableWrapper'
import ModalWrapper from '../components/ModalWrapper'
import PickListWrapper from '../components/PickListWrapper'

import styles from '../styles/OrderWizzardConfigurationDetails.css'

class OrderWizzardConfigurationDetails extends React.Component {

  componentDidMount() {
    OrderWizzardActions.checkAvailability(this.props.configuration, this.props.selectedEvent);
    OrderWizzardActions.fetchStockItemForCategory(this.props.configuration.category_set.category_entities);
  }

  render() {

    const { configuration, selectedEvent, stockAvalityProblems, stockItemsInCategories, itemsFromOptions, isStockLoading, onRentClick, onOptionSelected } = this.props;

    const headerNamesItems = ["Name", "Availiable amount" ,"Requiered amount", "Needs to be rented"]
    const fieldsToShow = ["item_name", "avaliable_amount", "required_amount", "need_to_be_rented"]

    const isModalOpen = stockAvalityProblems.length != 0

    const title = isStockLoading ? "Looking for problems" : "Some items are not avaliable"


    return (
      <div>

        <PickListWrapper
          stockItemsInCategories={ stockItemsInCategories }
          onOptionSelected={ onOptionSelected }
          selectedOptions= {itemsFromOptions }
        />

        <ModalWrapper
          title={ title }
          isLoading={ isStockLoading }
          onClickOk={ () => onRentClick(stockAvalityProblems) }
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

export default OrderWizzardConfigurationDetails;
