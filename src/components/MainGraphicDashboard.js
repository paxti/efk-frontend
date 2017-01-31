'use strict';

import React from 'react';
import { Link } from 'react-router'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetailLabel,
  Icon, DropdownButton, MenuItem, Grid
} from 'react-lightning-design-system';

import TwoByTwoWrapper from './TwoByTwoWrapper'

import '../styles/MainGraphicDashboard.css'

class MainGraphicDashboard extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>
          <PageHeaderHeading
            legend="LEADS"
            title={(
              <Grid vertical={false}>
                <PageHeaderHeadingTitle>
                  My Leads (truncates)
                </PageHeaderHeadingTitle>
                <DropdownButton type="icon-bare" icon="down" className="slds-align-middle">
                </DropdownButton>
              </Grid>
            )}
            info="10 items • Sorted by Name"
          />
      </PageHeader>
      <TwoByTwoWrapper />
    </div>
    );
  }
}

MainGraphicDashboard.displayName = 'MainGraphicDashboard';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default MainGraphicDashboard;
