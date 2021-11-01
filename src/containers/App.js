import React from 'react'
import { connect } from 'react-redux'
// import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

// import { defaultStartPath } from '../constants/defaultValues'

import AppLocale from '../lang'
import MainApp from '../routes'
import Login from '../routes/login'
// import error from '../routes/error'

import 'react-perfect-scrollbar/dist/css/styles.css'
import '../assets/css/sass/themes/gogo.light.purple.scss'
import '../assets/fonts/iconsmind/style.css'

/*
color options :
	 'light.purple'		'dark.purple'
	 'light.blue'		'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		'dark.red'
*/

const App = ({ locale }) => {
  const currentAppLocale = AppLocale[locale]
  const storedToken = window.localStorage.getItem('token')
  const storedUser = window.localStorage.getItem('user')
// console.log(storedUser)
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      { (storedToken && storedUser) ?  <MainApp /> : <Login /> }
    </IntlProvider>
  )
}

const mapStateToProps = ({ settings, authUser }) => {
  const { locale } = settings
  const { user, token } = authUser
  return { locale, user, token }
}

export default connect(
  mapStateToProps, null
)(App)
