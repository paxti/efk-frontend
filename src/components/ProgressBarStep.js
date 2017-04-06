'use strict';

import React from 'react';

import { Icon } from 'react-lightning-design-system'

import styles from '../styles/ProgressBarStep.css'

class ProgressBarStep extends React.Component {

  render() {

    const { children, isActive, isComplited, onClick } = this.props;

    const buttonClassesBasic = 'slds-button slds-progress__marker slds-button--icon';
    const buttonClassesAdd =  isComplited ? styles.adapt_progress : '';
    const isActiveClass = isActive ? 'slds-is-active' : '';
    const isComplitedClass = isComplited ? 'slds-is-completed' : '';
    const isComplitedButton = isComplited ? 'slds-progress__marker--icon' : '';


    return (
      <li className={`slds-progress__item ${isActiveClass} ${isComplitedClass}`}>
        <button
          className={`${buttonClassesBasic} ${buttonClassesAdd} ${isComplitedButton}`}
          onClick={() => onClick()}>
          {
            isComplited ? (
              <Icon category="utility" size="x-small" icon="success" />
            ) : ('')
          }

          <span className={styles.step_text}>{children}</span>
        </button>
      </li>
    );
  }
}

export default ProgressBarStep;
