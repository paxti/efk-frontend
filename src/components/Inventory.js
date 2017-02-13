'use strict';

import React from 'react'

import Sidebar from './Sidebar'
import DataTable from './DataTable'
import Home from './Home'
import PageHeaderContainer from './PageHeaderContainer'

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetailLabel,
  Icon, DropdownButton, MenuItem, Grid
} from 'react-lightning-design-system'

import '../styles/Inventory.css'

class Inventory extends React.Component {
  render() {
    return (
      <div className="slds-grid slds-grid--vertical-stretch">
        <div className="slds-col slds-large-size--2-of-12">
          <Sidebar  />
        </div>
        <div className="slds-col slds-large-size--6-of-12">
          <PageHeaderContainer
            legend="Test legend"
            header="Inventory"
            info="some info here (3)">
              <DataTable />
            </PageHeaderContainer>
        </div>
        <div className="slds-col slds-large-size--4-of-12">
          <Home content="Something here" />
        </div>
      </div>
    );
  }
}

Inventory.displayName = 'Inventory';
Inventory.className = 'Inventory';

// Uncomment properties you need
// InventoryComponent.propTypes = {};
// InventoryComponent.defaultProps = {};

export default Inventory;
