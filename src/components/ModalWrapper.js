'use strict';

import React from 'react';

import {
  Modal, Button, Spinner
} from 'react-lightning-design-system';

import styles from '../styles/ModalWrapper.css'

class ModalWrapper extends React.Component {
  render() {

    const { children, title, isLoading, onClickOk, showing  } = this.props;

    const { Header, Content, Footer } = Modal;

    let spinner = "";
    if (isLoading) {
      spinner = <Spinner type='brand' size='medium' />
    }

    return (
      <Modal
        opened={ showing }
        size={ 'large' }
        >
        <Header title={ title } closeButton={ false } />
        <Content className={`${styles.min_height} slds-p-around--small slds-is-relative`}>
          {children}
          {spinner}
        </Content>
        <Footer>
          <Button type='brand' label='Contact sales representative' />
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Rent' onClick={ () => onClickOk() } />
        </Footer>
      </Modal>
    );
  }
}

export default ModalWrapper;
