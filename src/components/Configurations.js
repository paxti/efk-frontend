'use strict';

import React from 'react'

import ConfigurationActions from '../actions/ConfigurationActions';
import ConfigurationStore from '../stores/ConfigurationStore';

import TableWrapperWithHeader from './TableWrapperWithHeader'

import { Grid, Row, Col } from 'react-lightning-design-system'

class Configurations extends React.Component {

  constructor() {
    super();
    this.state = {
      configurations: [],
      isLoading: true
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
      configurations: ConfigurationStore.getConfigurations(),
      isLoading: ConfigurationStore.getConfigurationsRequestStatus()
    });
  }

  render() {

    const headers = ["Name", "SFID" ];
    const fieldsToShow = [
      { type: "field", path: "name"},
      { type: "field", path: "sfid"}
    ];

    const details = [{
        label: "Total", title: "sd34234", text: "Total: " + " items"
      }
    ];

    return (
      <Grid>
        <Row cols={12}>
          <Col cols={2}>

          </Col>
          <Col cols={6}>

          <TableWrapperWithHeader
            legend={ "Configurations" }
            title={ "Title 456" }
            details={ details }
            fields={ fieldsToShow }
            headers={ headers }
            data={ this.state.configurations }
            isLoading={ this.state.isLoading } />

          </Col>
          <Col cols={4}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Configurations;
