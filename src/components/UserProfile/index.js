import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { Button, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { changePassword } from '../../util/fetch/user';
import IntlMessages from '../../util/IntlMessages';
import BreadcrumbContainer from '../BreadcrumbContainer';
import { Colxx, Separator } from '../CustomBootstrap';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      oldPassword: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  isValid() {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let { password, confirmPassword } = this.state;
    return re.test(password) && password === confirmPassword;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValid()) return;

    this.setState({ isLoading: true });
    const { password, confirmPassword, oldPassword } = this.state;
    const { user } = this.props;
    changePassword(user.id, user.email, password, confirmPassword, oldPassword, this.props.token)
      .then(() => {
        this.props.alert.success('Password changed');
        this.setState({ isLoading: false });
        this.setState({ password: '', confirmPassword: '', oldPassword: '' });
      })
      .catch(() => {
        this.props.alert.error(`could't change the password`);
        this.setState({ isLoading: false });
      })
  }

  render() {
    const { match, user } = this.props;
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <BreadcrumbContainer
              match={match}
            />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx>
            <h2 className='text-center mb-5'><IntlMessages id='user.welcome' /></h2>
          </Colxx>
        </Row>
        <Row>
          <Colxx>
            <img style={{ height: '150px', width: '150px' }} className='img-thumbnail rounded mx-auto d-block' src={user.image_url} alt='profile' />
          </Colxx>
        </Row>
        <Row>
          <Colxx>
            <h4 className='text-center mb-5 mt-3'>{user.email}</h4>
            <hr />
          </Colxx>
        </Row>
        <Row>
          <Colxx>
            <h3 className='text-center mb-5'><IntlMessages id='user.change-password' /></h3>
            <hr />
          </Colxx>
        </Row>
        <Row className='justify-content-md-center'>
          <Colxx md='6'>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for='user-old-password'><IntlMessages id='user.current-password' /></Label>
                <Input
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                  type='password'
                  name='oldPassword'
                  id='user-old-password'
                />
              </FormGroup>
              <FormGroup>
                <Label for='user-password'><IntlMessages id='user.password' /></Label>
                <Input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type='password'
                  name='password'
                  id='user-password'
                />
              </FormGroup>
              <FormGroup>
                <Label for='user-confirm-password'><IntlMessages id='user.confirm-password' /></Label>
                <Input
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type='password'
                  name='confirmPassword'
                  id='user-confirm-password'
                />
              </FormGroup>
              <Button
                disabled={!this.isValid()}
                block
                color='primary'
                type='submit'
              >
                {this.state.isLoading ?
                  <Spinner size="sm" color="light" /> :
                  <IntlMessages id='user.change-button' />
                }
              </Button>
            </Form>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number
  }).isRequired
}

export default withAlert()(UserProfile)
