'use strict';

import React from 'react';

import {
  Form, Picklist, PicklistItem
} from 'react-lightning-design-system';

import styles from '../styles/PickListWrapper.css'


function test(itemsFromOptions, categoryId){

  let res = '';

  if (itemsFromOptions.length > 0) {
    itemsFromOptions.forEach( (selected) => {
      if (selected.item.category.id == categoryId) {
        res = selected.item.sfid
      }
    })
  }

  return res;
}

class PickListWrapper extends React.Component {
  render() {

    const { stockItemsInCategories, selectedOptions, onOptionSelected } = this.props;

    return (

      <Form type='horizontal'>
        {
          stockItemsInCategories.map( (category, index) => {
            return <Picklist
                      value={ test(selectedOptions, category.categoryId) }
                      label={category.categoryName}
                      key={category.categoryId}>
                        {
                          category.options.map( (option) => {
                            return  <PicklistItem
                                      value={ option.item.sfid }
                                      key={ index + '.' + option.item.sfid }
                                      onClick={ () => onOptionSelected(option) }>
                                        {option.item.name}
                                    </PicklistItem>
                          })
                        }
                  </Picklist>
        })
      }
    </Form>

    );
  }
}

export default PickListWrapper;
