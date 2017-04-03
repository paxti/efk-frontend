'use strict';

import React from 'react';

import {
  Table, TableHeader, TableBody, TableRow, TableHeaderColumn 
} from 'react-lightning-design-system';

import NetworkLoader from './NetworkLoader'
import StandartTableColumn from './StandartTableColumn'

import styles from '../styles/StandartTableWrapper.css'

class StandartTableWrapper extends React.Component {
  render() {

    const { headers, data, fields, isLoading } = this.props;

    return (
      <NetworkLoader isLoading={ isLoading }>
        <Table bordered>
          <TableHeader>
            <TableRow>
              { headers.map( (name, id) => <TableHeaderColumn key={ 'h' + id }>{ name }</TableHeaderColumn>) }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (entity, dataId) => (
               <TableRow key={ dataId }>
                 {
                   fields.map( (field, fieldId) => (
                     <StandartTableColumn
                        key={ dataId + '.' + fieldId }
                        entity={ entity }
                        field={ field } />
                   ))
                 }
               </TableRow>
             ))
           }
          </TableBody>
        </Table>
      </NetworkLoader>
    );
  }
}

export default StandartTableWrapper;
