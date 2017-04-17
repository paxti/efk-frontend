'use strict';

import React from 'react';

import {
  Col, Row, Grid, Lookup, Form, FieldSet, Button, MediaObject
} from 'react-lightning-design-system';

import styles from '../styles/OrderWizardConfiguration.css'

class OrderWizardConfiguration extends React.Component {

  render() {

    const { configurations, selectedEvent, onShowDetails, onSelectConfiguration } = this.props;


    const mediaText = `Sit nulla est ex deserunt exercitation anim occaecat.
    Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
    Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.`;

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
