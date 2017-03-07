'use strict';

import React from 'react'

import StockItemActions from '../actions/StockItemActions';
import StockItemStore from '../stores/StockItemStore';

import OrderWizardActions from '../actions/OrderWizardActions'
import OrderWizardStore from '../stores/OrderWizardStore'

import PageHeaderWrapper from './PageHeaderWrapper'
import StandartTableWrapper from './StandartTableWrapper'
import MasterDetails from './MasterDetails'
import Navigation from './Navigation'

import { Grid, Row, Col } from 'react-lightning-design-system'

import styles from '../styles/Inventory.css'

class Inventory extends React.Component {

  constructor() {
    super();
    this.state = {
      stockItems: [],
      categoriesForStock: [],
      filterId: -1
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    OrderWizardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    OrderWizardActions.fetchCategoriesForStock();
  }

  componentWillUnmount() {
    OrderWizardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      stockItems: OrderWizardStore.getStocItemsInCategory(),
      categoriesForStock: OrderWizardStore.getCategoriesForStock(),
    });
  }

  onOrderWizardChange(){
    this.setState({

    })
  }

  onChangeRentailFilter(filter){
    OrderWizardActions.setRentalFilter(filter);
    OrderWizardActions.fetchStockItemForCategory(filter);
  }

  render() {

    const headers = ["Name", "Amount", "Category" ];
    const fieldsToShow = ["item.name", "amount", "item.category.name"];

    const details = [
      {
        label: "Total", title: "sd34234", text: "Total: " + " items"
      }
    ];

    return (
      <MasterDetails
        content="Step 4"
        filterId={ this.state.filterId }
        navigation={<Navigation
           filterId={ this.state.filterId  }
           active={ true }
           names={ this.state.categoriesForStock }
           onChangeFilter={ this.onChangeRentailFilter }
        />}
        sidebar={<div></div>}>

        <div>
          <PageHeaderWrapper
            legend={ "Configurations" }
            title="Title"
            detailItems={ details }
          />
          <StandartTableWrapper
            fields={ fieldsToShow }
            headers={ headers }
            data={ this.state.stockItems }
          />
        </div>


      </MasterDetails>
    );
  }
}

export default Inventory;
