'use strict';

import React from 'react';

import { Form, Input } from 'react-lightning-design-system';

class RentalForm extends React.Component {

  render() {

    const { data, onChangeHandler } = this.props;

    return (
      <Form ref='innerForm' type='horizontal' error='Hello world'>
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
