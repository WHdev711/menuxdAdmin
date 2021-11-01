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
  Col,
  Form,
  Spinner
} from 'reactstrap'
import { useAlert } from 'react-alert'

import { getDishesFile, createDishes } from '../../util/fetch/dish'
import IntlMessages from '../../util/IntlMessages'

const DishBackupModal = ({ open, close, className, clientId, updateDishes, token }) => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert()

  const uploadFile = () => {
    setIsLoading(true)
    createDishes(clientId, file, token).then(() => {
      alert.success('File upload')
      updateDishes()
      setIsLoading(false)
      close()
    }).catch(() => {
      alert.error('Error')
      setIsLoading(false)
      close()
    })
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-backupdishes' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for="fileInput" sm={4}>
                <IntlMessages id='forms.download' />
              </Label>
              <Col sm={8}>
                <a className='btn btn-primary btn-block' target='_blank' rel="noopener noreferrer" href={getDishesFile(clientId)} download='dishes.json'>
                  <IntlMessages id='button.download' />
                </a>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="fileInput" sm={4}>
                <IntlMessages id='forms.upload' />
              </Label>
              <Col sm={8}>
                <Input
                  className='form-control'
                  style={{ height: '50px' }}
                  onChange={e => setFile(e.target.files[0])}
                  type='file'
                  name='file'
                  id='fileInput'
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={uploadFile}>
            {isLoading
              ? <Spinner size='sm' color='light' />
              : <IntlMessages id='button.upload' />
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

DishBackupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  updateDishes: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
}

export default DishBackupModal
