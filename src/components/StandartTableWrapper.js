'use strict';

import React from 'react';

import {
  Modal, Button, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, Spinner
} from 'react-lightning-design-system';

import styles from '../styles/StandartTableWrapper.css'

function getValueByDotNotation(obj, path) {
 return new Function('_', 'return _.' + path)(obj);
}

class StandartTableWrapper extends React.Component {
  render() {

    const { headers, data, fields } = this.props;
    
    return (
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
                   <TableRowColumn key={ dataId + '.' + fieldId }>{ getValueByDotNotation(entity, field) }</TableRowColumn>
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
