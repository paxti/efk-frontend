'use strict';

import React from 'react';

import ProgressBar from  './ProgressBar'
import OrderStepContainer from './OrderStepContainer'

import styles from '../styles/Wizard.css'

class Wizard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    }

    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.nextStep       = this.nextStep.bind(this);
    this.previousStep   = this.previousStep.bind(this);
  }

  setCurrentStep(step){
    this.setState({ currentStep: step });
  }

  nextStep(){
    this.setCurrentStep(this.state.currentStep + 1);
  }

  previousStep(){
    this.setCurrentStep(this.state.currentStep - 1);
  }

  render(){

    const {
      steps, selectedEvent, selectedConfiguration, selectedGraphicsSet,
      rentals, reservedFromInventory, selectedOptions
     } = this.props;

    let compToRender = React.cloneElement(steps[this.state.currentStep].component, {
      step: this.state.currentStep,
    });

    return (
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className="slds-border--bottom">
            <ProgressBar
              steps={this.props.steps.map(step => { return step.name })}
              complited={[]}
              activeStep={this.state.currentStep}
              onChangeStep={ (step) => { this.setCurrentStep(step); } }/>
          </div>
        </div>
        <div className={ styles.lower }>
          <OrderStepContainer
            step={ this.state.currentStep }
            nextStep={ this.nextStep }
            previousStep={ this.previousStep }
            filterId={ steps[this.state.currentStep].filterId }
            navigation={ steps[this.state.currentStep].navigation }
            selectedEvent={ selectedEvent }
            selectedConfiguration={ selectedConfiguration }
            selectedGraphicsSet={ selectedGraphicsSet }
            rentals={ rentals }
            reservedFromInventory={ reservedFromInventory }
            selectedOptions={ selectedOptions }>

            { steps[this.state.currentStep].component }

          </OrderStepContainer>
        </div>
      </div>
      )
  }

}

Wizard.PropTypes = {
  steps: React.PropTypes.array.isRequired,
  selectedEvent: React.PropTypes.array.isRequired,
  selectedConfiguration: React.PropTypes.array.isRequired,
  selectedGraphicsSet: React.PropTypes.array.isRequired,
  rentals: React.PropTypes.array.isRequired,
  reservedFromInventory: React.PropTypes.array.isRequired,
  selectedOptions: React.PropTypes.array.isRequired,
  navigation: React.PropTypes.element
}

export default Wizard;
