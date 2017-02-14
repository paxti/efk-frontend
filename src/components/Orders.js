'use strict';

import React from 'react';

import Sidebar from './Sidebar'
import DataTable from './DataTable'
import EventsBox from './EventsBox'
import PageHeaderContainer from './PageHeaderContainer'
import OrderActions from '../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableRowColumnActions,
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetailLabel,
  Icon, DropdownButton, MenuItem, Grid
} from 'react-lightning-design-system'

import '../styles/Orders.css'

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
    OrderActions.recieveOrders();
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      orders: OrderStore.getOrders()
    });
  }

  render() {

    const titles = ['SFID', 'Details'];

    return (
      <div className="slds-grid slds-grid--vertical-stretch">
        <div className="slds-col slds-large-size--2-of-12">
          <Sidebar  />
        </div>
        <div className="slds-col slds-large-size--6-of-12">
          <PageHeaderContainer
            legend="Test legend"
            header="Orders"
            info="some info here (3)">


            <Table bordered >
              <TableHeader>
                <TableRow>
                  {titles.map(function(title, index){
                    return  <TableHeaderColumn key={index}>{title}</TableHeaderColumn>;
                  })}
                </TableRow>
              </TableHeader>

              <TableBody>

              {this.state.orders.map(function(order, index){
                return <TableRow key={order["id"]}>
                  <TableRowColumn>{order["sfid"]}</TableRowColumn>
                  <TableRowColumn>{order["id"]}</TableRowColumn>
                </TableRow>;
              })}

              </TableBody>

            </Table>
          </PageHeaderContainer>
        </div>
        <div className="slds-col slds-large-size--4-of-12">
          <EventsBox />
        </div>
      </div>
    );
  }
}

Orders.displayName = 'Orders';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default Orders;
