'use strict';

import React from 'react';

import OrderWizardActions from '../actions/OrderWizardActions'

import ImagesGridWithButtons from './ImagesGridWithButtons'

class OrderWizardGraphicsSet extends React.Component {

  componentDidMount() {
    OrderWizardActions.fetchConfigurationDetailsOnly(this.props.selectedConfiguration);
  }

  render() {

    const { graphicsSets, onShowDetails, onSelectGraphicsSet } = this.props;

    return (
      <ImagesGridWithButtons
        imgStyle={{ height: 100, width: 140 }}
        numberOfRows={ 3 }
        objects={ graphicsSets }
        onShowDetails={ onShowDetails }
        onSelect={ onSelectGraphicsSet } />
    );
  }
}

export default OrderWizardGraphicsSet;
