'use strict';

import React from 'react';

import { MediaObject } from 'react-lightning-design-system';

import styles from '../styles/ConfigurationDetails.css'

/**
 * ConfigurationDetails component
 */

class ConfigurationDetails extends React.Component {
  render() {

    const { configurationDetails, content } = this.props;

    return (
      <div>
        <br></br><h1>Configuration info: </h1><br></br>
        <h1>Configuration name: { configurationDetails.name }</h1>
        <h1>Elements in configuration: { configurationDetails.bom.item_entities.length}</h1>
        <MediaObject figureCenter={ <img
            src={ configurationDetails.img_path }
            alt='Placeholder'
            style={{ height: 200 }}
            />
        }/>
      </div>
    );
  }
}

export default ConfigurationDetails;
