'use strict';

import React from 'react';

import {
  Form, Picklist, PicklistItem
} from 'react-lightning-design-system';


import OrderWizzardActions from '../actions/OrderWizzardActions'

import StandartTableWrapper from '../components/StandartTableWrapper'
import ModalWrapper from '../components/ModalWrapper'

import styles from '../styles/OrderWizzardConfigurationDetails.css'

class OrderWizzardConfigurationDetails extends React.Component {

  componentDidMount() {
    OrderWizzardActions.checkAvailability(this.props.configuration, this.props.selectedEvent)
  }

  render() {

    const { configuration, selectedEvent, stockAvalityProblems, isStockLoading, onRentClick } = this.props;

    const headerNamesItems = ["Name", "Availiable amount" ,"Requiered amount", "Needs to be rented"]
    const fieldsToShow = ["item_name", "avaliable_amount", "required_amount", "need_to_be_rented"]

    const isModalOpen = stockAvalityProblems.length != 0


    const title = isStockLoading ? "Looking for problems" : "Some items are not avaliable"

    return (
      <div>

        <Form type='horizontal' onSubmit={ () => console.log("sdfsdf") }>
          <Picklist label='Picklist Label'>
            <PicklistItem value='1' onClick={ () => console.log("selected") }>Picklist Item One</PicklistItem>
            <PicklistItem value='2'>Picklist Item Two</PicklistItem>
          </Picklist>
        </Form>

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
