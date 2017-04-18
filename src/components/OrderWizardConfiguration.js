'use strict';

import React from 'react';

import ImagesGridWithButtons from './ImagesGridWithButtons'

class OrderWizardConfiguration extends React.Component {

  render() {

    const { configurations, selectedEvent, onShowDetails, onSelectConfiguration } = this.props;

    return (
      <ImagesGridWithButtons
        imgStyle={{ height: 100, width: 140 }}
        numberOfRows={ 3 }
        objects={ configurations }
        onShowDetails={ onShowDetails }
        onSelect={ onSelectConfiguration } />
    );
  }
}

export default OrderWizardConfiguration;
