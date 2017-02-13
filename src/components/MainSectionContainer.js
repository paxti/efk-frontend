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

import '../styles/MainSectionContainer.css'

class MainSectionContainer extends React.Component {
  render() {

    // let children = null;
    // if (this.props.middle_children) {
    //   children = React.cloneElement(this.props.middle, {
    //     children: this.props.middle_children
    //   })
    // }

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

MainSectionContainer.displayName = 'MainSectionContainer';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default MainSectionContainer;
