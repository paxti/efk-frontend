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
        <Row cols={12} nowrap className={styles.full_height}>
          <Col cols={2} className={styles.limit_loader}>
            {navigation}
          </Col>
          <Col cols={7} className={styles.limit_loader}>
            { navigation && filterId ? (
              React.cloneElement(children, { filter: filterId })
            ): (
              children
            )}
          </Col>
          <Col cols={3} className={styles.limit_loader}>
            {sidebar}
          </Col>
        </Row>
      </Grid>
    );
  }
}

MasterDetails.propTypes = {
  sidebar: React.PropTypes.element,
  children: React.PropTypes.element.isRequired,
  navigation: React.PropTypes.element,
  filterId: React.PropTypes.number
};

export default MasterDetails;
