'use strict';

import React from 'react';

import { Icon } from 'react-lightning-design-system'

import ProgressBarStep from  './ProgressBarStep'

import styles from '../styles/ProgressBar.css'

class ProgressBar extends React.Component {

  render() {

    const { steps, activeStep, complited, onChangeStep } = this.props;

    return (
      <div className={`${styles.wrapper} slds-progress`}>
        <ol className="slds-progress__list">
          {steps.map( (stepName, index) => {
            return <ProgressBarStep
                      isActive={index == activeStep}
                      isComplited={complited.includes(index)}
                      onClick={ () => onChangeStep(index) }>
                        {stepName}
                    </ProgressBarStep>
          })}
        </ol>
        <div className="slds-progress-bar">
          <span className="slds-progress-bar__value">
            <span className="slds-assistive-text"></span>
          </span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
