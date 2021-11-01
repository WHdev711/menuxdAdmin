import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'

const Welcome = ({ match }) => <Redirect to={`/client/${match.params.id}/options`} />

export default withRouter(Welcome)
