'use strict';

import React from 'react';

import {
  Modal, Button, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, Spinner
} from 'react-lightning-design-system';

import styles from '../styles/StandartTableWrapper.css'

class StandartTableWrapper extends React.Component {
  render() {

    const { headers, data, fields } = this.props;

    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            { headers.map( (name, id) => <TableHeaderColumn key={ id }>{ name }</TableHeaderColumn>) }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map( (entity, dataId) => (
             <TableRow key={ dataId }>
               {
                 fields.map( (field, fieldId) => (
                   <TableRowColumn key={ fieldId }>{entity[field]}</TableRowColumn>
                 ))
               }
             </TableRow>
           ))
         }
        </TableBody>
      </Table>
    );
  }
}

export default StandartTableWrapper;
