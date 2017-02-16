'use strict';

import React from 'react';

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetailLabel,
  Icon, DropdownButton, MenuItem, Grid
} from 'react-lightning-design-system';

import styles from '../styles/PageHeaderContainer.css'

class PageHeaderContainer extends React.Component {
  render() {

    const { children, legend, header, info } = this.props;

    return (
      <div>
        <PageHeader>
          <PageHeaderHeading
            legend={legend}
            title={(
              <Grid vertical={false}>
                <PageHeaderHeadingTitle>
                  {header}
                </PageHeaderHeadingTitle>
              </Grid>
            )}
            info={info}
            figure={
              <Icon
                category="standard"
                icon="opportunity"
              />
            }
          />
      </PageHeader>
      {children}
    </div>
    );
  }
}

export default PageHeaderContainer;
