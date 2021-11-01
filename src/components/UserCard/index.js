import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import IntlMessages from '../../util/IntlMessages';


const UserCard = ({ id, setCurrentUser, openModal, email, image_url, role, confirmed, setActionModal }) => {
  const onClick = () => {
    setCurrentUser()
    openModal()
  }

  const deleteUser = () => {
    setCurrentUser()
    setActionModal(true)
  }

  return (
    <Card>
      <CardImg src={image_url} alt='Card image cap' />
      <CardBody>
        <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <i style={{ fontSize: '18px ' }} className='iconsmind-Envelope mr-2 mb-2 align-seft-center' />
          <h3>
            {
              (role === 'client') ?
                <Link to={`clients/user/${id}`}>{email}</Link> : email
            }
          </h3>
        </CardTitle>
        <CardSubtitle className='text-center'>
          <Badge color={role !== 'admin' ? 'info' : 'success'}>{role}</Badge>
        </CardSubtitle>
        <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <Button onClick={onClick} color='primary' >
            <IntlMessages id='button.edit' />
          </Button>
          <Button onClick={deleteUser} color='secondary' >
            <IntlMessages id='button.delete' />
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}


UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  confirmed: PropTypes.bool,
  openModal: PropTypes.func,
  setCurrentUser: PropTypes.func,
  setActionModal: PropTypes.func,
}

export default UserCard
