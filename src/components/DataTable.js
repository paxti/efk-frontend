'use strict';

import React from 'react';
import { Link } from 'react-router'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableRowColumnActions,
  DropdownButton,
  MenuItem,
} from 'react-lightning-design-system';

import '../styles/DataTable.css'

class DataTable extends React.Component {
  render() {

    return (
      <div>
        <Table bordered >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>OPPORTUNITY NAME</TableHeaderColumn>
              <TableHeaderColumn>ACCOUNT NAME</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableRowColumn>jhkjhkj</TableRowColumn>
              <TableRowColumn>Cloudhub</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>iliuoiu</TableRowColumn>
              <TableRowColumn>Cloudhub</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

DataTable.displayName = 'DataTable';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default DataTable;
