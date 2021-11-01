import React, { Fragment, useState } from 'react'
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
  Form,
  Spinner,
  Col
} from 'reactstrap'
import { useAlert } from 'react-alert'

import { createClient, getClients } from '../../util/fetch/client'
import { uploadPicture } from '../../util/fetch/picture'
import IntlMessages from '../../util/IntlMessages'
import ImageUpload from '../../components/ImageUpload'

const ClientCreateModal = ({ open, close, userId, className, updateClients, token }) => {
  const [expiration, setExpiration] = useState(new Date().toISOString().slice(0, 10))
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert()

  const cleanForm = () => {
    setExpiration(new Date().toISOString().slice(0, 10))
    setName('')
    setPicture('')
  }

  const createClientHandle = () => {
    setIsLoading(true)
    createClient({ picture, name, expire_at: new Date(expiration), user_id: parseInt(userId, 10) }, token)
      .then(() => {
        setIsLoading(false)
        cleanForm()
        getClients(userId, token).then(res => {
          updateClients(res.data)
        })
        close()
      })
      .catch(() => {
        alert.error('Error')
        setIsLoading(false)
        close()
      })
  }

  const handlePictureChange = ({ target }) => {
    setIsLoading(true)
    uploadPicture(userId, target.name, target.files[0], token)
      .then(res => {
        setPicture(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        alert.error('Error')
      })
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-addclient' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for="clientName" sm={2}>
                <IntlMessages id='forms.name' />
              </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  name='name'
                  id='clientName'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="clientDate" sm={2}>
                <IntlMessages id='forms.date' />
              </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={expiration}
                  onChange={e => setExpiration(e.target.value)}
                  type='date'
                  name='date'
                  id='clientDate'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pictureInput' sm={2}>
                <IntlMessages id='forms.picture' />
              </Label>
              <Col className='align-self-center' sm={10}>
                <ImageUpload id='pictureInput' name='client' onChange={handlePictureChange} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} color='primary' onClick={createClientHandle}>
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
  )
}

ClientCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateClients: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
}

export default ClientCreateModal
