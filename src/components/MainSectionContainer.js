'use strict';

import React from 'react';

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  Grid
} from 'react-lightning-design-system';

import styles from '../styles/MainSectionContainer.css'

class MainSectionContainer extends React.Component {

  render() {

    return (
      <div>
        <PageHeader>
          <PageHeaderHeading
            legend="sadasd"
            title={(
              <Grid vertical={false}>
                <PageHeaderHeadingTitle>
                  {this.props.sub_title}
                </PageHeaderHeadingTitle>
              </Grid>
            )}
            info="sdfsdf"
          />
      </PageHeader>
      "fsdf"
    </div>
    );
  }
}

export default MainSectionContainer;
