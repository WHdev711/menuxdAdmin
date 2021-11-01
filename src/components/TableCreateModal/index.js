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

import { createTable, getTables } from '../../util/fetch/table'
import IntlMessages from '../../util/IntlMessages'

const TableCreateModal = ({ open, close, className, updateTables, clientId, userId, token }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [num, setNum] = useState(1)
  const [type, setType] = useState('table')
  const [available, setAvailable] = useState(false)
  const options = ['table', 'bar']
  const alert = useAlert()

  const cleanForm = () => {
    setNum(null)
    setType('table')
    setAvailable(false)
  }

  const addCategory = () => {
    setIsLoading(true)
    createTable({ type, available, number: parseInt(num, 10), client_id: clientId }, token)
      .then(() => {
        setIsLoading(false)
        cleanForm()
        getTables(clientId, token).then(res => {
          updateTables(res.data)
        })
        close()
      })
      .catch(() => {
        alert.error('Error')
        setIsLoading(false)
        close()
      })
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-addcategory' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for='numberInput' sm={2}>
                <IntlMessages id='forms.number' />
              </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={num}
                  onChange={e => setNum(e.target.value)}
                  type='number'
                  name='number'
                  id='numberInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='typeInput' sm={2}>
                <IntlMessages id='forms.type' />
              </Label>
              <Col sm={10}>
                <Input
                  className='form-control'
                  value={type}
                  onChange={e => setType(e.target.value)}
                  type='select'
                  name='type'
                  id='typeInput'
                >
                  {options.map((op, i) => <option key={i} value={op}>{op}</option>)}
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={addCategory}>
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

TableCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateTables: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
}

export default TableCreateModal
