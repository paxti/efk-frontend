'use strict';

import React from 'react';

import {
  PageHeader, PageHeaderHeading, PageHeaderDetail, PageHeaderDetailItem,
  PageHeaderDetailLabel, Icon, Text, ButtonGroup, Button
} from 'react-lightning-design-system';

/**
 * PageHeaderWrapper component
 *
 * buttons format
 * - type
 * - onClick Callback
 * - name
 *
 * detailItems format
 * - label
 * - title
 * - text
 */

class PageHeaderWrapper extends React.Component {
  render() {

    const { legend, title, icon='user', buttons=[], detailItems=[]  } = this.props;

    return (
      <PageHeader>
        <PageHeaderHeading
          legend={ legend }
          title={ title }
          figure={ <Icon icon={ icon } size='large' category='standard' icon='opportunity' /> }
          rightActions={(
            <ButtonGroup>
              {
                buttons.map( (button, index) => {
                  return <Button
                          key={ index }
                          type={ button.type }
                          onClick={ () => button.onClick() }>
                            { button.name }
                          </Button>;
                })
              }
            </ButtonGroup>
          )}
        />
        <PageHeaderDetail>

          {
            detailItems.map( (item, index) => {
              return  <PageHeaderDetailItem key={ index } label={item.label}>
                        <Text category='body' type='regular' truncate title={ item.title }>
                          { item.text }
                        </Text>
                      </PageHeaderDetailItem>
            })
          }
        </PageHeaderDetail>
      </PageHeader>
    );
  }
}

export default PageHeaderWrapper;
