import React from 'react'
import { withRouter } from 'react-router-dom'

import ClientContainer from '../../containers/ClientContainer'

const Client = ({ match }) => (
  <ClientContainer userId={match.params.id} />
)

export default withRouter(Client)
