'use strict';

import React from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system'

import OrderWizardSidebar from './OrderWizardSidebar'
import MasterDetails from './MasterDetails'
import Navigation from './Navigation'
import WizardStepContainer from './WizardStepContainer'

class OrderStepContainer extends React.Component {

  render() {

    const {
      children, filterId, navigation, selectedEvent,
      selectedConfiguration, selectedGraphicsSet, rentals,
      reservedFromInventory, selectedOptions, nextStep, previousStep
    } = this.props;

    const sidebar = <OrderWizardSidebar
      selectedEvent={ selectedEvent }
      selectedConfiguration={ selectedConfiguration }
      selectedGraphicsSet={ selectedGraphicsSet }
      rentals={ rentals }
      reservedFromInventory={ reservedFromInventory }
      selectedOptions={ selectedOptions } />;


    return (
      <MasterDetails
        filterId={ filterId }
        navigation={ navigation }
        sidebar={ sidebar }>

        <WizardStepContainer
          nextStep={ nextStep }
          previousStep={ previousStep }>

          { children }

        </WizardStepContainer>

      </MasterDetails>
    )
  }
}

OrderStepContainer.PropTypes = {
  children: React.PropTypes.element.isRequired,
  selectedEvent: React.PropTypes.array.isRequired,
  selectedConfiguration: React.PropTypes.array.isRequired,
  selectedGraphicsSet: React.PropTypes.array.isRequired,
  rentals: React.PropTypes.array.isRequired,
  reservedFromInventory: React.PropTypes.array.isRequired,
  selectedOptions: React.PropTypes.array.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  previousStep: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.element,
  filterId: React.PropTypes.number
}

export default OrderStepContainer;
