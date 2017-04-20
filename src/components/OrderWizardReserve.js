'use strict';

import React from 'react';

import ModalWrapperReserveForm from './ModalWrapperReserveForm'
import TableWrapperWithHeader from './TableWrapperWithHeader'

import styles from '../styles/OrderWizardReserve.css'

class OrderWizardReserve extends React.Component {

  render() {

    const {
      modalTitle, modalButtons, modalStatus, modalObject, onChangeModal,
      tableLegend, tableName, tableDetails, tableFields, tableHeaders,
      tableData, isLoading
    } = this.props;

    return (
      <div className={ styles.full_height }>
        <ModalWrapperReserveForm
          title={ modalTitle }
          buttons={ modalButtons }
          isLoading={ false }
          isShowing={ modalStatus }
          entity={ modalObject }
          onChange={ onChangeModal } />

        <TableWrapperWithHeader
          legend={ tableLegend }
          title={ tableName }
          details={ tableDetails }
          fields={ tableFields }
          headers={ tableHeaders }
          data={ tableData }
          isLoading={ isLoading } />
        </div>
    );
  }
}

OrderWizardReserve.PropTypes = {
  modalTitle: React.PropTypes.string.isRequired,
  modalTitle: React.PropTypes.array.isRequired,
  modalStatus: React.PropTypes.bool.isRequired,
  modalObject: React.PropTypes.object.isRequired,
  onChangeModal: React.PropTypes.bool.isRequired,
  tableLegend: React.PropTypes.string.isRequired,
  tableName: React.PropTypes.string.isRequired,
  tableDetails: React.PropTypes.object.isRequired,
  tableFields: React.PropTypes.array.isRequired,
  tableHeaders: React.PropTypes.array.isRequired,
  tableData: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

export default OrderWizardReserve;
