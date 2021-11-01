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
  CustomInput,
  Col,
  Form,
  Spinner
} from 'reactstrap'
import { useAlert } from 'react-alert'

import ImageUpload from '../../components/ImageUpload'
import { uploadPicture } from '../../util/fetch/picture'
import { editClient, getClients } from '../../util/fetch/client'
import IntlMessages from '../../util/IntlMessages'

const ClientEditModal = ({ oldClient, open, close, className, updateClients, token }) => {
  const client = oldClient
  const [isLoading, setIsLoading] = useState(false)
  const [picture, setPicture] = useState(client.picture)
  const [clientName, setClientName] = useState(client.name)
  const [clientExpire, setClientExpire] = useState(new Date(client.expire_at).toISOString().slice(0, 10))
  const [clientActive, setClientActive] = useState(client.active)
  const alert = useAlert()

  const cleanForm = () => {
    setPicture(client.picture)
    setClientExpire(new Date(client.expire_at).toISOString().slice(0, 10))
    setClientName(client.name)
    setClientActive(client.active)
  }

  useEffect(() => cleanForm(), [oldClient])

  const updateClient = () => {
    setIsLoading(true)
    editClient(client.id, {
      picture,
      name: clientName,
      active: clientActive,
      user_id: client.user_id,
      expire_at: new Date(clientExpire)
    }, token).then(res => {
      setIsLoading(false)
      getClients(client.user_id, token).then(res => updateClients(res.data))
      close()
    }).catch((err) => {
      alert.error('Error')
      setIsLoading(false)
      close()
    })
  }

  const handlePictureChange = ({ target }) => {
    setIsLoading(true)
    uploadPicture(client.id, target.name, target.files[0], token)
      .then(res => {
        setIsLoading(false)
        setPicture(res.data)
      })
      .catch(err => {
        setIsLoading(false)
        alert.error('Error')
      })
  }

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editclient' />
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup row>
            <Label for='clientName' sm={2}>
              <IntlMessages id='forms.name' />
            </Label>
            <Col sm={10}>
              <Input
                className='form-control'
                defaultValue={clientName}
                onChange={e => setClientName(e.target.value)}
                type='text'
                name='clientName'
                id='clientName'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='clientActive' sm={2}>
              <IntlMessages id='forms.active' />
            </Label>
            <Col sm={10}>
              <CustomInput
                style={{ background: '#fff' }}
                type='switch'
                id='clientActive'
                name='customSwitch'
                defaultChecked={clientActive}
                onChange={e => { setClientActive(e.target.checked) }}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for='expireAt'>
              <IntlMessages id='forms.date' />
            </Label>
            <Input
              type='date'
              name='date'
              id='expireAt'
              defaultValue={clientExpire}
              onChange={e => setClientExpire(e.target.value)}
              placeholder='05/10/2020'
            />
          </FormGroup>
          <FormGroup row>
            <Label for='pictureInput' sm={2}>
              <IntlMessages id='forms.picture' />
            </Label>
            <Col className='align-self-center' sm={8}>
              <ImageUpload
                defaultImage={client.picture}
                id='pictureInput'
                name='client'
                onChange={handlePictureChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updateClient}>
          {isLoading
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

ClientEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  oldClient: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  updateClients: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

export default ClientEditModal
