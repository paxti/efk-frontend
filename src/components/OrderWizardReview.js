'use strict';

import React from 'react';

import {
  PageHeader, PageHeaderHeading, PageHeaderDetail, PageHeaderDetailItem,
  PageHeaderDetailLabel, PageHeaderDetailBody,
  Col, Row, Grid, Icon, Text, ButtonGroup, Button
} from 'react-lightning-design-system';

import PageHeaderWrapper from '../components/PageHeaderWrapper'
import StandartTableWrapper from '../components/StandartTableWrapper'

import styles from '../styles/OrderWizardReview.css'

/**
 * OrderWizardReview component
 */

class OrderWizardReview extends React.Component {


  render() {

    const { configuration, selectedConfiguration, event, inventory, rentals, selectedEvent,  allEntities, onPutOrder } = this.props;

    const headerNamesItems = ["Name", "Amount" ,"Provider" ];
    const fieldsToShow = [
      {type: "field", path: "name"},
      {type: "field", path: "amount"},
      {type: "field", path: "provider"}
    ];

    const buttons = [{type: 'brand', name: 'Put order', onClick: () => onPutOrder(selectedEvent, selectedConfiguration, allEntities)}];
    const detailItems = [{
        label: "Reserved from inventory", title: "sd34234", text: "Total: " + inventory.length + " items"
      },{
        label: "Mast be rented", title: "1111111111", text:  "Total: " + rentals.length + " items"
      }
    ];

    return (
      <Grid>
        <Row cols={12}>
          <Col cols={8} padded>

            <PageHeaderWrapper
              legend={ "Lagent" }
              title="Title"
              detailItems={ detailItems }
              buttons={ buttons }
            />
            <StandartTableWrapper
              fields={ fieldsToShow }
              headers={ headerNamesItems }
              data={ allEntities }
            />

          </Col>
          <Col cols={4}>
            <Row>
              {event}
            </Row>
            <Row>
              {configuration}
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderWizardReview;
