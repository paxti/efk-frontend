'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

import {
  Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, Spinner, Button
} from 'react-lightning-design-system';

import ModalWrapper from '../components/ModalWrapper'
import RentalForm from '../components/RentalForm'

import styles from '../styles/StandartTableWrapper.css'



class OrderWizardRentalTable extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalOpen: false
    }
  }

  findAmountReserved(inventory, currentItem){

    let res = 0;

    if (inventory.length > 0) {
      inventory.forEach( (inventoryItem) => {
        if (inventoryItem.sfid == currentItem.item.sfid) {
          res = inventoryItem.amount
        }
      })
    }

    return res;
  }


  render() {

    const { data, reservedFromInventory, rentalModalState, rentalModalObject, onRentShowModal, onRentHideModal, onRentalModalObjectUpdate, onAddToRent } = this.props;

    const headers = ['Name', 'Total', 'Reserved', 'Action'];

    const buttons = [
      {type: 'brand', label: 'Cancel', onClick: () => onRentHideModal()},
      {type: 'brand', label: 'Rent', onClick: () => onAddToRent(rentalModalObject) }
    ]

    let modal = <div></div>;
    if (rentalModalState && rentalModalObject.item) {
      modal = <ModalWrapper
        title={"Reserve " + rentalModalObject.item.name }
        size="medium"
        data={ rentalModalObject }
        isLoading={ false }
        buttons={ buttons }
        showing={ rentalModalState }
        >

        <RentalForm
          data={ rentalModalObject }
          onChangeHandler={ onRentalModalObjectUpdate } />

      </ModalWrapper>
    }

    return (

      <div>
        <Table bordered>
          <TableHeader>
            <TableRow>
              { headers.map( (name, id) => <TableHeaderColumn key={ id }>{ name }</TableHeaderColumn>) }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (entity, dataId) => (
               <TableRow key={ dataId }>
                   <TableRowColumn key={ dataId + '1' }>{entity.item.name}</TableRowColumn>
                   <TableRowColumn key={ dataId + '2' }>{entity.amount}</TableRowColumn>
                   <TableRowColumn key={ dataId + '3' }>{this.findAmountReserved(reservedFromInventory, entity)}</TableRowColumn>
                   <TableRowColumn key={ dataId + '4' }>
                     <Button type="brand" onClick={ () => onRentShowModal(entity) }>Change amount</Button>
                   </TableRowColumn>
               </TableRow>
             ))
           }
          </TableBody>
        </Table>

        {modal}

      </div>
    );
  }
}

export default OrderWizardRentalTable;
