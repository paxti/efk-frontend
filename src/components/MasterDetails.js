'use strict';

import React from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system'

import OrderWizardActions from '../actions/OrderWizardActions'

import styles from '../styles/MasterDetails.css'

class MasterDetails extends React.Component {

  componentDidMount() {
    OrderWizardActions.fetchStockItemForCategory(this.props.filterId);
  }

  render() {

    const { navigation, sidebar, children, filterId } = this.props;

    return (
      <Grid className={styles.full_height}>
        <Row cols={12} nowrap>
          <Col cols={2} className={styles.limit_loader}>
            {navigation}
          </Col>
          <Col cols={7} className={styles.limit_loader}>
            { React.cloneElement(children, { filter: filterId }) }
          </Col>
          <Col cols={3} className={styles.limit_loader}>
            {sidebar}
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default MasterDetails;
