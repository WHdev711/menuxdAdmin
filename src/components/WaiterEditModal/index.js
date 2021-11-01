import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Col,
  Form,
  Spinner
} from 'reactstrap'
import { useAlert } from 'react-alert'

import { editWaiter } from '../../util/fetch/waiter'
import IntlMessages from '../../util/IntlMessages'

const WaiterEditModal = ({ open, close, id, currentName, currentPin, clientId, className, updateWaiters, token }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(currentName)
  const [pin, setPin] = useState(currentPin)
  const alert = useAlert()

  const cleanForm = () => {
    setName(currentName)
    setPin(currentPin)
  }

  useEffect(() => cleanForm(), [currentName, currentPin])

  const updateWaiter = () => {
    setIsLoading(true)
    editWaiter(id, { pin, name }, token)
      .then(res => {
        alert.success('Waiter updated')
        setIsLoading(false)
        updateWaiters()
        close()
      })
      .catch((err) => {
        alert.error('Error')
        setIsLoading(false)
        close()
    })
  }

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editwaiter' />
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
        <Button color='primary' onClick={updateWaiter}>
          { isLoading
            ? <Spinner size='sm' color='light' />
            : <IntlMessages id='button.edit' />
          }
        </Button>{' '}
        <Button color='secondary' onClick={close}>
          <IntlMessages id='button.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

WaiterEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  currentPin: PropTypes.string.isRequired,
  currentName: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
  updateWaiters: PropTypes.func.isRequired
}

export default WaiterEditModal
