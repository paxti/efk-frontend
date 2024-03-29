'use strict';

import React from 'react';

import OrderActions from '../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

import PageHeaderContainer from '../components/PageHeaderContainer'

class OrderDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      order: {}
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    OrderStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    OrderActions.fetchOrder(this.props.params.orderId);
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      order: OrderStore.getOrder()
    });
  }

  render() {

    let legend = '';
    let header = '';
    let info = '';

    if (this.state.order.configuration !== undefined) {
      console.log(this.state.order)
      legend = this.state.order.configuration.name;
      header = this.state.order.event.name
      info = 'Requested (' + this.state.order.request_bom.request_entities.length + ') items';
    }

    return (
      <div>
        <PageHeaderContainer legend={legend} header={header} info={info} />
      </div>
    );
  }
}

export default OrderDetails;
