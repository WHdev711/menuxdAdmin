import React from 'react'
import { useAlert } from 'react-alert'
import PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
  Badge
} from 'reactstrap'

import IntlMessages from '../../util/IntlMessages'
import { editTable } from '../../util/fetch/table'

const TableCard = ({ id, setCurrentTable, num, type, available, setActionModal, updateTables, token }) => {
  const alert = useAlert()
  const onClick = () => {
    setCurrentTable()
    editTable(id, {
      type,
      number: num,
      available: !available
    }, token)
      .then(() => {
      updateTables()
    })
      .catch(err => alert.error('Error!'))
   }

  const deleteTable = () => {
    setCurrentTable()
    setActionModal(true)
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <h3><i className='iconsmind-Sushi'/> {''} { <IntlMessages id='label.table' /> } { ' ' } {num}</h3>
        </CardTitle>
        <CardSubtitle className='text-center'>
          <Badge pill style={{fontSize: '.8rem'}} color={ available ? 'success' : 'warning'}>{ type }</Badge>
        </CardSubtitle>
        <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <Button onClick={onClick} color='primary' >
            {
              available ? <IntlMessages id='label.unavailable' /> : <IntlMessages id='label.available' />
            }
          </Button>
          <Button onClick={deleteTable} color='secondary' >
            <IntlMessages id='button.delete' />
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}

TableCard.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  available: PropTypes.bool,
  updateTables: PropTypes.func,
  setCurrentTable: PropTypes.func,
  token: PropTypes.string.isRequired,
  setActionModal: PropTypes.func,
}

export default TableCard
