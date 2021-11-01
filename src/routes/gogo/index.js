import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import start from './start'

export default ({ match }) => (
  <Switch>
    <Route path={`${match.url}`} component={start} />
    <Redirect to='/error' />
  </Switch>
)
