'use strict';

import React from 'react';

import {
  Col, Row, Grid, Input
} from 'react-lightning-design-system';

import styles from '../styles/ItemForm.css'

class ItemForm extends React.Component {

  handleAmountChange = (event) => {

    if (this.props.entity.amount < event.target.value) {
      console.log("nope")
    } else if (event.target.value < 0) {
      console.log('can\'t be lover then 0');
    } else if (event.target.value < 0 ){
      console.log('can\'t be less then 0');
    } else if (1!=1) {
      console.log('Cant rent less then required');
    } else {

      this.props.onChangeHandle(
        Object.assign({}, this.props.entity, { rented: event.target.value })
      )
    }
  };

  render() {

    const { imgSrc, entity, error } = this.props;
    const { name, amount, rented, item } = entity;

    return (
      <Grid>
        <Row cols={2}>
          <Col cols={1} padded>
            <img src={this.props.imgSrc} className={styles.limit_height}/>
          </Col>
          <Col cols={1}>
            <span className="slds-text-heading--large">{ this.props.entity.item.name }</span>
            <span className="slds-section__title">Avaliable: { this.props.entity.amount }</span>
            <span className="slds-section__title">Reserved so far: { this.props.entity.rented }</span>

            <Input
              label="How many to reserve"
              type="number"
              error={ this.props.error }
              onChange={ this.handleAmountChange }
              value={ this.props.entity.rented } />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ItemForm;
