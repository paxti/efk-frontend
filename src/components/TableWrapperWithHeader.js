'use strict';

import React from 'react';

import StandartTableWrapper from './StandartTableWrapper'
import PageHeaderWrapper from './PageHeaderWrapper'

import styles from '../styles/TableWrapperWithHeader.css'

class TableWrapperWithHeader extends React.Component {

  render() {

    const { title, legend, details, fields, headers, data, isLoading } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.upper}>
          <PageHeaderWrapper
            legend={ legend }
            title={ title }
            detailItems={ details } />
        </div>
        <div className={styles.lower}>
          <StandartTableWrapper
            fields={ fields }
            headers={ headers }
            data={ data }
            isLoading= { isLoading } />
        </div>
      </div>
    );
  }
}

export default TableWrapperWithHeader;
