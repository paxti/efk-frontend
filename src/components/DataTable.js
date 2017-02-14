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

    // console.log(this.props.data);

    return (
      <div>
        <Table bordered >
          <TableHeader>
            <TableRow>
              {this.props.titles.map(function(title, index){
                return  <TableHeaderColumn>{title}</TableHeaderColumn>;
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

DataTable.displayName = 'DataTable';

// Uncomment properties you need
// MenuItemComponent.propTypes = {};
// MenuItemComponent.defaultProps = {};

export default DataTable;
