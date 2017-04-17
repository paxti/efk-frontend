'use strict';

import React from 'react';

import { Grid, Row, Col, Icon, Spinner } from 'react-lightning-design-system'

import styles from '../styles/WizardStepContainer.css'


class WizarStepContainer extends React.Component {

  render() {

    let compToRender = React.cloneElement(this.props.children);

    return (
      <div className={`${styles.step_container} slds-box slds-grid--vertical-stretch`} >
        <div className={styles.content_wrapper}>
          { compToRender }
        </div>
        <div>
          <button type="button" className="slds-button slds-button--neutral">Previous</button>
          <button type="button" className="slds-button slds-button--brand">Next</button>
        </div>
      </div>
    );
  }
}

export default WizarStepContainer;
