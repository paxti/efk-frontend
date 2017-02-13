'use strict';

import React from 'react';

import Sidebar from './Sidebar'
import DataTable from './DataTable'
import EventsBox from './EventsBox'
import PageHeaderContainer from './PageHeaderContainer'

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetailLabel,
  Icon, DropdownButton, MenuItem, Grid
} from 'react-lightning-design-system'

import '../styles/Orders.css'

class Orders extends React.Component {
  render() {
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
              <DataTable />
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
