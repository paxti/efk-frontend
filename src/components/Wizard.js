'use strict';

import React from 'react';

import BoxFiller from  './BoxFiller'
import ProgressBar from  './ProgressBar'

import { Grid, Row, Col } from 'react-lightning-design-system'



import OrderWizardSidebar from  './OrderWizardSidebar'

import WizardStepContainer from  './WizardStepContainer'
import OrderWizardEvent from  './OrderWizardEvent'

import styles from '../styles/Wizard.css'

class Wizard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    }

    this.setCurrentStep = this.setCurrentStep.bind(this);
  }

  setCurrentStep(step){
    this.setState({ currentStep: step });
  }

  render(){

    let compToRender = React.cloneElement(this.props.steps[this.state.currentStep].component);

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
        <div className={styles.lower}>
          { compToRender }
        </div>
      </div>
      )
  }

}

export default Wizard;
