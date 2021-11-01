import React from 'react'
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

const WaiterCard = ({ id, setCurrentWaiter, name, pin, available, setActionModal, openModal }) => {
  const onClick = () => {
    setCurrentWaiter()
    openModal()
   }

  const deleteTable = () => {
    setCurrentWaiter()
    setActionModal(true)
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <h3><i className='iconsmind-Waiter'/> {''} { name.toUpperCase() }</h3>
        </CardTitle>
        <CardSubtitle className='text-center'>
          <Badge style={{fontSize: '.8rem'}} color='info'>{ pin }</Badge>
        </CardSubtitle>
        <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <Button onClick={onClick} color='primary' >
            <IntlMessages id='button.edit' />
          </Button>
          <Button onClick={deleteTable} color='secondary' >
            <IntlMessages id='button.delete' />
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}

WaiterCard.propTypes = {
  id: PropTypes.number.isRequired,
  pin: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  openModal: PropTypes.func,
  setCurrentWaiter: PropTypes.func,
  setActionModal: PropTypes.func,
}

export default WaiterCard
