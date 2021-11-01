import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { createWaiter } from '../../util/fetch/waiter';
import IntlMessages from '../../util/IntlMessages';


const WaiterCreateModal = ({ open, close, className, updateWaiters, clientId, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('1234');
  const alert = useAlert();

  const cleanForm = () => {
    setName('');
    setPin('1234');
  };

  const addWaiter = () => {
    setIsLoading(true)
    createWaiter({ name, pin, client_id: clientId }, token)
      .then(() => {
        setIsLoading(false);
        cleanForm();
        updateWaiters();
        close();
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
        close();
      });
  };

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-addwaiter' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for='nameInput' sm={2}>
                <IntlMessages id='forms.name' />
              </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  name='name'
                  id='nameInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pinInput' sm={2}>
                PIN
            </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  type='text'
                  name='pin'
                  id='pinInput'
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={addWaiter}>
            {isLoading
              ? <Spinner size='sm' color='light' />
              : <IntlMessages id='button.add' />
            }
          </Button>{' '}
          <Button color='secondary' onClick={close}>
            <IntlMessages id='button.cancel' />
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

WaiterCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateWaiters: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
};

export default WaiterCreateModal;
