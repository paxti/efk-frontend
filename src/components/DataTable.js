'use strict';

import React from 'react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'react-lightning-design-system';

import styles from '../styles/DataTable.css'

class DataTable extends React.Component {
  render() {
    return (
      <div>
        <Table bordered >
          <TableHeader>
            <TableRow>
              {this.props.titles.map(function(title, index){
                return <TableHeaderColumn>{title}</TableHeaderColumn>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.data.map(function(order, index){
              return
                <TableRow key={order["id"]}>
                  <TableRowColumn>{order["sfid"]}</TableRowColumn>
                  <TableRowColumn>{order["id"]}</TableRowColumn>
                </TableRow>;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default DataTable;
