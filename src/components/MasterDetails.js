'use strict';

import React from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system'

import OrderWizzardActions from '../actions/OrderWizzardActions'

class MasterDetails extends React.Component {

  componentDidMount() {
    OrderWizzardActions.fetchStockItemForCategory(this.props.filterId);
  }

  render() {

    const { navigation, sidebar, children, filterId } = this.props;

    return (
      <Grid color>
        <Row cols={12}>
          <Col cols={2}>
            {navigation}
          </Col>
          <Col cols={7}>
            { React.cloneElement(children, { filter: filterId }) }
          </Col>
          <Col cols={3}>
            {sidebar}
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default MasterDetails;
