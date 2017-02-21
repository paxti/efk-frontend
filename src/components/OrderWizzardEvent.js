'use strict';

import React from 'react';

import {
  Col, Row, Grid, Lookup, Form, FieldSet, Button
} from 'react-lightning-design-system';

import styles from '../styles/OrderWizzardEvent.css'

class OrderWizzardEvent extends React.Component {
  render() {

    const { selectedEvent, events, onEventSelect } = this.props;

    return (
      <Form type='compound'>
         <FieldSet>
          <Grid>
            <Row cols={8}>
              <Col cols={1}></Col>
              <Col cols={6} padded>
                <Lookup label='Select event'
                 defaultSearchText=''
                 data={ events }
                 selected={ selectedEvent }
                 onSelect={ function(selected) { selected && selected.target ? onEventSelect(null) : onEventSelect(selected)} }
                 lookupFilter={ (entry, text) => entry.label.toUpperCase().indexOf(text.toUpperCase()) === 0 }
                 listFooter={ <Button icon='add' iconAlign='left'>{'Add new'}</Button> }
                />
              </Col>
              <Col cols={1}></Col>
            </Row>
          </Grid>
        </FieldSet>
      </Form>
    );
  }
}

export default OrderWizzardEvent;
