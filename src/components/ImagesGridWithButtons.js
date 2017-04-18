'use strict';

import React from 'react';

import {
  Col, Row, Grid, Form, FieldSet, Button, MediaObject
} from 'react-lightning-design-system';

class ImagesGridWithButtons extends React.Component {

  render() {

    const { imgStyle, numberOfRows, objects, onShowDetails, onSelect } = this.props;

    return (
      <Form type='compound'>
         <FieldSet>
            <Grid>
              <Row cols={numberOfRows}>
              {
                objects.map( (object) => {
                  return <Col cols={1} key={object.id}>
                          <MediaObject figureCenter={ <img
                              src={ object.img_path }
                              alt='Placeholder'
                              style={ imgStyle }
                            />
                          }>
                            <p>{ object.name }</p>
                            <Button
                              type='brand'
                              onClick={ () => onShowDetails(object) }>
                                Details
                            </Button>
                            <Button
                              type='brand'
                              onClick={ () => onSelect(object) }>
                                Select
                            </Button>
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

export default ImagesGridWithButtons;
