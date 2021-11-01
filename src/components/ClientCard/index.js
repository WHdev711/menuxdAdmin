import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import IntlMessages from '../../util/IntlMessages'



const ClientCard = ({ client, setCurrentClient, setActionModal, openModal, user }) => {
  const getDate = (dateStr) => {
    const date = new Date(dateStr)
    const day = date.getDate() < 10 ? `0${date.getDate() +
      1}` : date.getDate() + 1
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    return `${day}-${month}-${date.getFullYear()}`
  }

  const isExpired = (new Date(client.expire_at).getTime() <= new Date().getTime());

  const clickHandle = () => {
    setCurrentClient(client)
    openModal()
  }

  const deleteClient = () => {
    setCurrentClient(client)
    setActionModal(true)
  }

  return (
    <Card>
      <CardImg style={{ height: '150px', transition: 'all .5s', filter: !isExpired ? null : 'grayscale(100%)' }} src={client.picture} alt='Card image cap' />
      <CardBody>
        <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
          {isExpired ? (<h3 style={{ color: '#777', textDecoration: 'line-through' }}>{client.name}</h3>) : (
            <Link to={`/client/${client.id}`}>
              <h3>{client.name}</h3>
            </Link>
          )}
        </CardTitle>
        <CardSubtitle className='text-center'>
          <Badge color={isExpired ? 'danger' : client.active ? 'info' : 'success'}>
            {isExpired ? <IntlMessages id='state.expired' /> : client.active ? <IntlMessages id='state.active' /> : <IntlMessages id='state.inactive' />}
          </Badge>
          <CardText className='text-center'>
            {getDate(client.expire_at)}
          </CardText>
        </CardSubtitle>
        {user.role === 'admin' && (
          <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
            <Button onClick={clickHandle} color='primary'>
              <IntlMessages id='button.edit' />
            </Button><Button onClick={deleteClient} color='secondary'>
              <IntlMessages id='button.delete' />
            </Button>
          </ButtonGroup>
        )}
      </CardBody>
    </Card>
  )
}

ClientCard.propTypes = {
  client: PropTypes.object.isRequired
}

export default ClientCard
