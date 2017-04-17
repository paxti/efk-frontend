'use strict';

import React from 'react';

import Sidebar from './Sidebar'
import TableWrapperWithHeader from './TableWrapperWithHeader'

import OrderActions from '../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

import { Grid, Col, Row } from 'react-lightning-design-system'

import styles from '../styles/Orders.css'

class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
      orders: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    OrderStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    OrderActions.fetchOrders();
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      orders: OrderStore.getOrders(),
      isLoading: OrderStore.getOrdersRequestStatus()
    });
  }

  render() {

    const headers = ["Id", "SFID" ];
    const fieldsToShow = [
      { type: 'field', path: "id"},
      { type: 'field', path: "sfid"},
      { type: 'link', path: "sfid", linkPath: '/home/orders/', linkId: 'id', title: 'Details'},
      { type: 'button_link', path: "sfid", linkPath: '/home/orders/', linkId: 'id', title: 'Details' }
    ];

    const details = [{
        label: "Total", title: "sd34234", text: "Total: " + " items"
      }
    ];
    return (
      <Grid>
        <Row cols={12}>
          <Col cols={2}>
            <Sidebar  />
          </Col>
          <Col cols={6}>

          <TableWrapperWithHeader
            legend={ "Something here" }
            title={ "Title 123" }
            details={ details }
            fields={ fieldsToShow }
            headers={ headers }
            data={ this.state.orders }
            isLoading={ this.state.isLoading } />

          </Col>
          <Col cols={4}>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Orders;
