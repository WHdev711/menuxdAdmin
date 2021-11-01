import React, { useState, useEffect, Fragment } from 'react'
import { CardDeck, Row, Button } from 'reactstrap'
import { useAlert } from 'react-alert'
import { connect } from 'react-redux'

import IntlMessages from '../../util/IntlMessages'
import { Colxx } from '../../components/CustomBootstrap'
import Spinner from '../../components/Spinner'
import { getUsers, deleteUser } from '../../util/fetch/user'
import UserCard from '../../components/UserCard'
import UserEditModal from '../../components/UserEditModal'
import UserCreateModal from '../../components/UserCreateModal'
import ActionModal from '../../components/ActionModal'

const UserContainer = ({ token }) => {
  const [users, setUsers] = useState(null)
  const [updateModal, setUpdateModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [actionModal, setActionModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const alert = useAlert()

  useEffect(() => {
    getUsers(token)
      .then(res => setUsers(res.data))
      .catch(err => err)
  }, [])

  const deleteUserById = id => {
    deleteUser(id, token).then(() => {
      getUsers(token).then(res => setUsers(res.data))
      setActionModal(false)
    }).catch(err => alert.error('Error'))
  }

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.users' /></h1>
        </Colxx>
      </Row>
      <Row className='mb-4'>
        <Colxx sm={2} className='ml-auto'>
          <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} color='primary'>
            <IntlMessages id='button.add' />
          </Button>
        </Colxx>
      </Row>
      <CardDeck>
        {users ?
          <Row style={{ width: '100%' }}>
            {users.map(user => (
              <Colxx className='mb-5' md='12' lg='6' xl='4' key={user.id}>
                <UserCard
                  setCurrentUser={() => setCurrentUser(user)}
                  setActionModal={setActionModal}
                  openModal={() => setUpdateModal(true)}
                  deleteUser={() => deleteUser(user.id)}
                  {...user}
                />
              </Colxx>))}
          </Row>
          : <Spinner />}
      </CardDeck>
      {currentUser && <UserEditModal
        token={token}
        updateUsers={(users) => setUsers(users)}
        close={() => setUpdateModal(false)}
        open={updateModal}
        oldUser={currentUser}
      />
      }
      <UserCreateModal
        token={token}
        updateUsers={(users) => setUsers(users)}
        close={() => setCreateModal(false)}
        open={createModal}
      />
      {currentUser && <ActionModal
        action={() => deleteUserById(currentUser.id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-user' /> {' '} {currentUser.email}?
       </ActionModal>
      }
    </Fragment>
  )
}

const mapStateToProps = ({ currentClient, authUser }) => {
  const { client } = currentClient
  const { user, token } = authUser
  return { client, user, token }
}

export default connect(mapStateToProps, null)(UserContainer)
