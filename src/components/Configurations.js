'use strict';

import React from 'react'

import ConfigurationActions from '../actions/ConfigurationActions';
import ConfigurationStore from '../stores/ConfigurationStore';

import PageHeaderWrapper from './PageHeaderWrapper'
import StandartTableWrapper from './StandartTableWrapper'

import { Grid, Row, Col } from 'react-lightning-design-system'

import styles from '../styles/Configurations.css'

class Configurations extends React.Component {

  constructor() {
    super();
    this.state = {
      configurations: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    ConfigurationStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    ConfigurationActions.receiveConfigurations();
  }

  componentWillUnmount() {
    ConfigurationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      configurations: ConfigurationStore.getConfigurations()
    });
  }

  render() {

    const headers = ["Name", "SFID" ];
    const fieldsToShow = ["name", "sfid"];

    const details = [{
        label: "Total", title: "sd34234", text: "Total: " + " items"
      }
    ];

    return (
      <Grid>
        <Row cols={12}>
          <Col cols={2} padded>

          </Col>
          <Col cols={6}>
            <PageHeaderWrapper
              legend={ "Configurations" }
              title="Title"
              detailItems={ details }
            />
            <StandartTableWrapper
              fields={ fieldsToShow }
              headers={ headers }
              data={ this.state.configurations }
            />
          </Col>
          <Col cols={4}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Configurations;
