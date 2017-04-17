'use strict';

import React from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system'

import styles from '../styles/MasterDetailsEmpty.css'

class MasterDetailsEmpty extends React.Component {

  render() {

    const { sidebar, children } = this.props;

    return (
      <Grid className={styles.full_height}>
        <Row cols={12} nowrap>
          <Col cols={2}></Col>
          <Col cols={7}>
            { children }
          </Col>
          <Col cols={3}>
            { sidebar }
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MasterDetailsEmpty;
