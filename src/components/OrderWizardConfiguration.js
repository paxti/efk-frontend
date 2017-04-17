'use strict';

import React from 'react';

import {
  Col, Row, Grid, Form, FieldSet, Button, MediaObject
} from 'react-lightning-design-system';

import styles from '../styles/OrderWizardConfiguration.css'

class OrderWizardConfiguration extends React.Component {

  render() {

    const { configurations, selectedEvent, onShowDetails, onSelectConfiguration } = this.props;

    return (
      <Form type='compound'>
         <FieldSet>
            <Grid>

              <Row cols={3}>

              {
                configurations.map(function(configuration) {
                return <Col cols={1} key={configuration.id}>
                        <MediaObject figureCenter={ <img
                            src={ configuration.img_path }
                            alt='Placeholder'
                            style={{ height: 100, width: 140 }}
                          />
                        }>
                          <p>{ configuration.name }</p>
                          <Button type='brand' onClick={ () => onShowDetails(configuration) }> Details </Button>
                          <Button type='brand' onClick={ () => onSelectConfiguration(configuration) }> Select </Button>
                        </MediaObject>
                      </Col>;
                })
              }

              </Row>
            </Grid>
          </FieldSet>
        </Form>
    );
  }
}

export default OrderWizardConfiguration;
