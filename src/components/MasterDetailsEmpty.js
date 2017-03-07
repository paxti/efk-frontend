'use strict';

import React from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system'

class MasterDetailsEmpty extends React.Component {

  render() {


    const { sidebar, children } = this.props;

    return (
      <Grid color>
        <Row cols={12}>
          <Col cols={2}></Col>
          <Col cols={7}>
            { children }
          </Col>
          <Col cols={3}>
            {sidebar}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MasterDetailsEmpty;
