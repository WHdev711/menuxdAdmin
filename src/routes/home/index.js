import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import UserContainer from '../../containers/UserContainer'

const Home = ({ user }) => {
  if (user.role === 'admin') {
    return <UserContainer />
  }

  return <Redirect to={`/clients/user/${user.id}`} />
}

const mapStateToProps = (state) => ({
  user: state.authUser.user
})

export default connect(mapStateToProps, null)(Home)
