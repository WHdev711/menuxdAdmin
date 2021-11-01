import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Button, CardTitle, Form, Input, Label } from 'reactstrap';
import IntlMessages from '../../util/IntlMessages';


const ForgotPassword = ({ setForgotPassword, forgotPassword }) => {
  const [email, setEmail] = useState('');

  const sendForgotPassword = (e) => {
    e.preventDefault();
    forgotPassword(email);
    setEmail('');
  }

  const isValid = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const onClick = e => {
    e.preventDefault();
    setForgotPassword(false);
  };

  return (
    <Fragment>
      <CardTitle className='mb-4'>
        <IntlMessages id='forms.title-forgotpassword' />
      </CardTitle>
      <Form onSubmit={sendForgotPassword} method='POST'>
        <Label className='form-group has-float-label mb-4'>
          <Input type='email' name='email' value={email} onChange={({ target }) => setEmail(target.value)} placeholder='demo@gogo.com' />
          <IntlMessages id='user.email' />
        </Label>
        <div className='d-flex justify-content-between align-items-center'>
          <a href='/' onClick={onClick}>
            <IntlMessages id='user.come-back' />
          </a>
          <Button
            disabled={!isValid()}
            color='primary'
            className='btn-shadow'
            size='lg'
            type='submit'
          >
            <IntlMessages id='button.submit' />
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

export default ForgotPassword;
