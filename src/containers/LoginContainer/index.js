import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';
import { Card, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import ForgotPassword from '../../components/ForgotPassword';
import Login from '../../components/Login';
import { forgotPassword, loginUser } from '../../util/fetch/user';

class LoginLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      lostPass: false
    }

    this.onUserLogin = this.onUserLogin.bind(this)
    this.onForgotPassword = this.onForgotPassword.bind(this)
  }

  onUserLogin(email, password) {
    this.setState({ isLoading: true })
    loginUser(email, password)
      .then(res => {
        const { user, token } = res.data
        window.localStorage.setItem('user', JSON.stringify(user))
        window.localStorage.setItem('token', token)
        this.setState({ isLoading: false })
        this.props.loginUser(user, token)
        this.props.alert.success('Welcome!')
      })
      .catch(() => {
        this.props.alert.error('Invalid email or password')
        this.setState({ isLoading: false })
      })
  }

  onForgotPassword(email) {
    this.setState({ isLoading: true });
    forgotPassword(email)
      .then(() => {
        this.props.alert.success('E-mail sent!');
      })
      .catch(() => {
        this.props.alert.error('Invalid email');
        this.setState({ isLoading: false });
      })
  }

  componentDidMount() {
    document.body.classList.add('background')
  }

  componentWillUnmount() {
    document.body.classList.remove('background')
  }

  render() {
    const { lostPass, isLoading } = this.state

    return (
      <Fragment>
        <div className='fixed-background' />
        <main>
          <div className='container'>
            <Row className='h-100'>
              <Colxx xxs='12' md='12' className='mx-auto my-auto'>
                <Card className='auth-card' style={{ borderRadius: '.3rem', overflow: 'hidden', width: '100%' }}>
                  <div className={classnames('position-relative', 'image-side', { 'forgot-password': lostPass })}>

                  </div>
                  <div className='form-side'>
                    <NavLink to={`/`} className='white'>
                      <span className='logo-single' />
                    </NavLink>
                    {
                      lostPass ?
                        <ForgotPassword
                          setForgotPassword={(state) => this.setState({ lostPass: state })}
                          forgotPassword={(email) => this.onForgotPassword(email)}

                        />
                        : <Login
                          isLoading={isLoading}
                          setForgotPassword={(state) => this.setState({ lostPass: state })}
                          loginUser={(email, password) => this.onUserLogin(email, password)}
                        />
                    }
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    )
  }
}

LoginLayout.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default withAlert()(LoginLayout)
