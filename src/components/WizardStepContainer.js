'use strict';

import React from 'react';

import { Button } from 'react-lightning-design-system'

import styles from '../styles/WizardStepContainer.css'


class WizarStepContainer extends React.Component {

  render() {

    const { nextStep, previousStep } = this.props;

    let compToRender = React.cloneElement(this.props.children);

    return (
      <div className={`${styles.step_container} slds-box slds-grid--vertical-stretch`} >
        <div className={styles.content_wrapper}>
          { compToRender }
        </div>
        <div>
          <Button type="neutral" label="Previous" onClick={ () => previousStep() } />
          <Button type="brand" label="Next" onClick={ () => nextStep() } />
        </div>
      </div>
    );
  }
}

WizarStepContainer.PropTypes = {
  nextStep: React.PropTypes.func.isRequired,
  previousStep: React.PropTypes.func.isRequired
}

export default WizarStepContainer;
