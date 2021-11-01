import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import { uploadPicture } from '../../util/fetch/picture';
import { createUser, getUsers } from '../../util/fetch/user';
import IntlMessages from '../../util/IntlMessages';


const UserCreateModal = ({ open, close, className, updateUsers, token }) => {
  const options = [
    { label: 'client', value: 'client' },
    { label: 'admin', value: 'admin' }
  ];
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const cleanForm = () => {
    setRole('client');
    setEmail('');
    setPicture('');
  };

  const updateUser = () => {
    setIsLoading(true)
    createUser({ email, role, image_url: picture }, token)
      .then(() => {
        setIsLoading(false)
        cleanForm()
        getUsers(token).then(res => {
          updateUsers(res.data)
        })
        close()
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
        close();
      });
  };

  const handlePictureChange = async ({ target }) => {
    setIsLoading(true)
    try {
      const res = await uploadPicture(0, target.name, target.files[0], token);
      setPicture(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert.error('Error');
    }
  };

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-adduser' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for="roleSelect" sm={3}>
                <IntlMessages id='forms.role' />
              </Label>
              <Col sm={9}>
                <Select
                  options={options}
                  onChange={e => setRole(e.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="emailInput" sm={3}>
                Email
              </Label>
              <Col sm={9}>
                <Input
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type='email'
                  name='email'
                  id='emailInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pictureInput' sm={3}>
                <IntlMessages id='forms.picture' />
              </Label>
              <Col className='align-self-center align-items-center' sm={9}>
                <ImageUpload id='pictureInput' name='user' onChange={handlePictureChange} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={updateUser}>
            {isLoading
              ? <Spinner size='sm' color='light' />
              : <IntlMessages id='button.add' />
            }
          </Button>{' '}
          <Button color='secondary' onClick={close}>
            <IntlMessages id='button.cancel' />
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

UserCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.object,
}

export default UserCreateModal
