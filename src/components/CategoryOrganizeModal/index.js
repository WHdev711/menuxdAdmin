import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, ListGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { updatePositionCategory } from '../../util/fetch/category';
import IntlMessages from '../../util/IntlMessages';
import Message from '../Message';
import Card from './Card';


const CategoryOrganizeModal = ({ open, close, categories = [], setCategories, className, updateCategories, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const updatePosition = async () => {
    setIsLoading(true);
    const data = categories.map((c, i) => ({ ...c, position: i + 1 }));
    try {
      await updatePositionCategory(data, token);
      setIsLoading(false);
      updateCategories();
    } catch (error) {
      alert.error('Error');
      setIsLoading(false);
    }
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = categories[dragIndex]
      setCategories(
        update(categories, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    },
    [categories],
  )
  const renderCard = (card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.title}
        moveCard={moveCard}
      />
    )
  }

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-organizecategories' />
      </ModalHeader>
      <ModalBody>
        {
          categories ?
            <ListGroup>{categories.map((c, i) => renderCard(c, i))}</ListGroup> :
            <Message><IntlMessages id='forms.not-have-categories' /></Message>
        }
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} onClick={updatePosition} color='primary'>
          {isLoading
            ? <Spinner size='sm' color='light' />
            : <IntlMessages id='button.update' />
          }
        </Button>{' '}
        <Button color='secondary' onClick={close}>
          <IntlMessages id='button.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

CategoryOrganizeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
  setCategories: PropTypes.func.isRequired,
  className: PropTypes.string,
  updateCategories: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default CategoryOrganizeModal;
