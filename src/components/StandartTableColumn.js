'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router'

import { TableRowColumn, Button } from 'react-lightning-design-system';

import styles from '../styles/StandartTableColumn.css';

function getValue(obj, path) {
  return new Function('_', 'return _.' + path)(obj);
}

function getLinkPath(entity, field) {
  return field.linkPath  + getValue(entity, field.linkId);
}

function changeLocation(entity, field) {
  browserHistory.push(getLinkPath(entity, field));
}

function callAction(entity, field) {
  field.callback(entity);
}

function buildColumnField(entity, field) {

  let title = getValue(entity, field.path);
  let res = title;

  switch(field.type){
    case 'link':
      return  <Link to={getLinkPath(entity, field)}>{ field.title }</Link>;

    case 'button_link':
      return <Button type="brand" onClick={ () => changeLocation(entity, field) }>{ field.title }</Button>;

    case 'button_action':
      return <Button type="brand" onClick={ () => callAction(entity, field) }>{ field.title }</Button>;

    default: return title;
  }

}

class StandartTableColumn extends React.Component {

  render() {

    const { key, entity, field } = this.props;

    return (
      <TableRowColumn key={ key }>{ buildColumnField(entity, field) }</TableRowColumn>
    );
  }
}

export default StandartTableColumn;
