'use strict';

import React from 'react';

import {
  Modal, Button, Spinner
} from 'react-lightning-design-system';

import styles from '../styles/ModalWrapper.css'

class ModalWrapper extends React.Component {

  render() {

    const { children, size, title, isLoading, onClickOk, showing, buttons } = this.props;

    const { Header, Content, Footer } = Modal;

    let spinner = "";
    if (isLoading) {
      spinner = <Spinner type='brand' size='medium' />
    }

    return (
      <Modal
        opened={ showing }
        size={ size }
        >
        <Header title={ title } closeButton={ false } />
        <Content className={`${styles.min_height} slds-p-around--small slds-is-relative`}>
          {children}
          {spinner}
        </Content>
        <Footer>
          {
            buttons.map( (button, index) => {
              return <Button
                key={index}
                type={button.type}
                label={button.label}
                onClick={ () => button.onClick() }
              />
            })
          }
        </Footer>
      </Modal>
    );
  }
}

export default ModalWrapper;
