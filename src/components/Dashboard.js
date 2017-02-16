'use strict';

import React from 'react';

import Sidebar from './Sidebar'
import TwoByTwoWrapper from './TwoByTwoWrapper'
import EventsBox from './EventsBox'
import PageHeaderContainer from './PageHeaderContainer'

import styles from '../styles/Dashboard.css'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className="slds-grid slds-grid--vertical-stretch">
          <div className="slds-col slds-large-size--2-of-12">
            <Sidebar  />
          </div>
          <div className="slds-col slds-large-size--6-of-12">

            <PageHeaderContainer
              legend="Test legend"
              header="Main dashboard"
              info="some info here (3)">
                <TwoByTwoWrapper />
            </PageHeaderContainer>
          </div>
          <div className="slds-col slds-large-size--4-of-12">
            <EventsBox />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default Dashboard;
