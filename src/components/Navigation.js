'use strict';

import React from 'react';

import styles from '../styles/Navigation.css'

import NetworkLoader from './NetworkLoader'
import NavigationItem from './NavigationItem'

class Navigation extends React.Component {
  render() {

    const { active, filterId, names, onChangeFilter, isLoading } = this.props;

    return (
      <NetworkLoader isLoading={ isLoading }>
        <div className="slds-grid slds-grid--vertical slds-navigation-list--vertical">
          <h2 className="slds-text-title--caps slds-p-around--medium" id="entity-header">Filters</h2>
          <ul>
            {
              names.map( (option, index) => {
                return <NavigationItem
                          key={option.id}
                          name={option.name}
                          active={option.id == filterId}
                          onClick={ () => onChangeFilter(option.id) }
                        />
              })
            }
          </ul>
        </div>
      </NetworkLoader>
    );
  }
}

export default Navigation;
