'use strict';

import React from 'react';

import {
  Form, Input, FormElement
} from 'react-lightning-design-system';

import styles from '../styles/RentalForm.css'

class RentalForm extends React.Component {
  render() {

    const { content, data, onChangeHandler } = this.props;

    return (
      <Form ref='innerForm' type="horizontal" error="Hello world">
          <Input
            id='amount'
            error="sdf"
            value={ data.amount }
            onChange={ onChangeHandler }
            label='How many to rent: ' />
      </Form>
    );
  }
}

export default RentalForm;
