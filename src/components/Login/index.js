import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Button, CardTitle, Form, Input, Label, Spinner } from 'reactstrap';
import IntlMessages from '../../util/IntlMessages';


const LoginLayout = ({ setForgotPassword, loginUser, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onUserLogin = (e) => {
        e.preventDefault();
        loginUser(email, password);
    };

    const isValid = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase()) && password !== '';
    };

    const onClick = e => {
        e.preventDefault();
        setForgotPassword(true);
    }

    return (<Fragment>
        <CardTitle className='mb-4' >
            <IntlMessages id='user.login-title' />
        </CardTitle><Form onSubmit={onUserLogin} method='POST'>
            <Label className='form-group has-float-label mb-4' >
                <Input type='email'
                    name='email'
                    value={email}
                    onChange={
                        ({ target }) => setEmail(target.value)
                    }
                    placeholder='demo@gogo.com' />
                <IntlMessages id='user.email' />
            </Label> <Label className='form-group has-float-label mb-4' >
                <Input type='password'
                    name='password'
                    value={password}
                    onChange={
                        ({ target }) => setPassword(target.value)
                    }
                    placeholder='goGo123' />
                <IntlMessages id='user.password' />
            </Label> <div className='d-flex justify-content-between align-items-center' >
                <a href='/'
                    onClick={onClick} >
                    <IntlMessages id='user.forgot-password-question' />
                </a> <Button disabled={!isValid()}
                    color='primary'
                    className='btn-shadow'
                    size='lg'
                    type='submit' > {
                        isLoading ?
                            <
                                Spinner size='sm'
                                color='light' />
                            :
                            <IntlMessages id='user.login-button' />
                    } </Button></div></Form></Fragment>
    )
}

LoginLayout.propTypes = {
    setForgotPassword: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default LoginLayout;