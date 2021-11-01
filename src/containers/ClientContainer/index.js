import React, { useState, useEffect, Fragment } from 'react'
import { CardDeck, Row, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { useAlert } from 'react-alert'
import PropTypes from 'prop-types'

import { Colxx } from '../../components/CustomBootstrap'
import Spinner from '../../components/Spinner'
import ClientCard from '../../components/ClientCard'
import ClientEditModal from '../../components/ClientEditModal'
import ClientCreateModal from '../../components/ClientCreateModal'
import GoBackButton from '../../components/GoBackButton'
import ActionModal from '../../components/ActionModal'
import Message from '../../components/Message'
import IntlMessages from '../../util/IntlMessages'
import { getClients, deleteClient } from '../../util/fetch/client'
import { setClient } from '../../redux/actions'

const ClientContainer = ({ userId, user, client, setClient, token, history }) => {
  const [clients, setClients] = useState(null)
  const [updateModal, setUpdateModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [actionModal, setActionModal] = useState(false)
  const alert = useAlert()

  useEffect(() => {
    getClients(userId, token)
      .then(res => {
        setClients(res.data)
      })
      .catch(err => alert.error('Error!'))
  }, [])

  const deleteClientById = id => {
    deleteClient(id, token).then(() => {
      getClients(userId, token).then(res => {
        setClients(res.data)
      }).catch(err => alert.error('Error!'))
      setActionModal(false)
    }).catch(err => alert.error('Error!'))
  }

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.clients' /></h1>
        </Colxx>
      </Row>
      {
        user.role === 'admin' && (
          <Row>
            <Colxx xs='2' className='ml-auto mr-1' >
              <GoBackButton history={history} />
            </Colxx>
            <Colxx xs='4'>
              <Button
                style={{ height: '2.5rem' }}
                onClick={() => setCreateModal(true)}
                className='mr-1'
                color='primary'
              >
                <IntlMessages id='button.add' />
              </Button>
            </Colxx>
          </Row>
        )
      }
      <CardDeck>
        {
          clients ?
            <Row style={{ width: '100%' }}>
              {clients.length > 0 ? clients
                .map(client => (
                  <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={client.id}>
                    <ClientCard
                      client={client}
                      setActionModal={setActionModal}
                      user={user}
                      setCurrentClient={setClient}
                      openModal={() => setUpdateModal(true)}
                    />
                  </Colxx>
                )) : <Message><IntlMessages id='forms.not-have-clients' /></Message>
              }
            </Row>
            : <Spinner />
        }
      </CardDeck>
      {client && <ClientEditModal
        oldClient={client}
        token={token}
        updateClients={setClients}
        open={updateModal}
        close={() => setUpdateModal(false)}
      />
      }
      <ClientCreateModal
        updateClients={(clients) => setClients(clients)}
        userId={userId}
        token={token}
        close={() => setCreateModal(false)}
        open={createModal}
      />
      {client && <ActionModal
        action={() => deleteClientById(client.id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-client' /> {' '} {client.name}?
       </ActionModal>
      }
    </Fragment>
  )
}

ClientContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  client: PropTypes.object
}

const mapStateToProps = ({ currentClient, authUser }) => {
  const { client } = currentClient
  const { user, token } = authUser
  return { client, user, token }
}

const mapStDispatchToProps = dispatch => bindActionCreators({
  setClient
}, dispatch)

export default connect(mapStateToProps, mapStDispatchToProps)(withRouter(ClientContainer))
