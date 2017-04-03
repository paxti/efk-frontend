'use strict';

import React from 'react';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

import Sidebar from './Sidebar'
import TwoByTwoWrapper from './TwoByTwoWrapper'
import EventsBox from './EventsBox'
import PageHeaderContainer from './PageHeaderContainer'

import styles from '../styles/Dashboard.css'

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      events: [],
      isLoading: true
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.recieveEvents();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      events: EventStore.getEvents(),
      isLoading: EventStore.isRequestPending()
    });
  }


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
            <EventsBox
              isLoading={this.state.isLoading}
              events={this.state.events} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';

export default Dashboard;
