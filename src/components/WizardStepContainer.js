'use strict';

import React from 'react';

import { Button } from 'react-lightning-design-system'

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
          <Button type="brand" label="Previous" />
          <Button type="neutral" label="Next" />
        </div>
      </div>
    );
  }
}

export default WizarStepContainer;
