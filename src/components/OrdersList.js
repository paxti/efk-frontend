'use strict';

import React from 'react';


// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHeaderColumn,
//   TableRowColumn,
//   TableRowColumnActions,
//
//
//   PageHeader,
//   PageHeaderHeading,
//   PageHeaderHeadingTitle,
//   PageHeaderDetail,
//   PageHeaderDetailItem,
//   PageHeaderDetailBody,
//   PageHeaderDetailLabel,
//   Icon, Crumb, Button, ButtonGroup, DropdownButton, MenuItem,
//   Text, Grid,
// } from 'react-lightning-design-system';

require('styles//OrdersList.css');

class OrdersList extends React.Component {
  render() {
    return ( <div></div>
      // <div>
      //   <PageHeader>
      //     <PageHeaderHeading
      //       title="Orders"
      //       info="Mark Jaeckal • Unlimited Customer • 11/13/15"
      //       figure={
      //         <Icon
      //           category="standard"
      //           icon="orders"
      //         />
      //       }
      //     />
      //   </PageHeader>
      //
      //   <Table>
      //     <TableHeader hasActions>
      //       <TableRow>
      //         <TableHeaderColumn>OPPORTUNITY NAME</TableHeaderColumn>
      //         <TableHeaderColumn>ACCOUNT NAME</TableHeaderColumn>
      //         <TableHeaderColumn>CLOSE DATE</TableHeaderColumn>
      //         <TableHeaderColumn>STAGE</TableHeaderColumn>
      //         <TableHeaderColumn>CONFIDENCE</TableHeaderColumn>
      //         <TableHeaderColumn>AMOUNT</TableHeaderColumn>
      //         <TableHeaderColumn>CONTACT</TableHeaderColumn>
      //       </TableRow>
      //     </TableHeader>
      //
      //     <TableBody>
      //       <TableRow>
      //         <TableRowColumn>Cloudhub</TableRowColumn>
      //         <TableRowColumn>Cloudhub</TableRowColumn>
      //         <TableRowColumn>4/14/2015</TableRowColumn>
      //         <TableRowColumn>Prospecting</TableRowColumn>
      //         <TableRowColumn>20%</TableRowColumn>
      //         <TableRowColumn>$25k</TableRowColumn>
      //         <TableRowColumn><a>jrogers@cloudhub.com</a></TableRowColumn>
      //       </TableRow>
      //     </TableBody>
      //   </Table>
      // </div>

    )
  }
}

OrdersList.displayName = 'OrdersList';

// Uncomment properties you need
// OrdersListComponent.propTypes = {};
// OrdersListComponent.defaultProps = {};

export default OrdersList;
