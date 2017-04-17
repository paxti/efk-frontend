'use strict';

import React from 'react';

import ModalWrapper from './ModalWrapper'
import ItemForm from './ItemForm'

class ModalWrapperReserveForm extends React.Component {

  render() {

    const { size, title, isLoading, isShowing, buttons, entity, onChange } = this.props;

    const img = '../assets/static/no_image_avaliable.jpg'

    return (
      <ModalWrapper
        title={ title }
        size={ size }
        buttons={ buttons }
        isLoading={ isLoading }
        showing={ isShowing }>

        { entity &&
          <ItemForm
            imgSrc={ img }
            entity={ entity }
            title={ entity.name }
            onChangeHandle={ onChange }/>
        }

      </ModalWrapper>

    );
  }
}

export default ModalWrapperReserveForm;
