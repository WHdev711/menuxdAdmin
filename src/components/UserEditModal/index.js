import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import { uploadPicture } from '../../util/fetch/picture';
import { editUser, getUsers } from '../../util/fetch/user';
import IntlMessages from '../../util/IntlMessages';


const UserEditModal = ({ oldUser, open, close, className, updateUsers, token }) => {
  const user = oldUser;
  const options = [
    { label: 'client', value: 'client' },
    { label: 'admin', value: 'admin' }
  ];
  const [role, setRole] = useState(user.role);
  const [picture, setPicture] = useState(user.image_url);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    setRole(user.role);
    setPicture(user.image_url);
  }, [oldUser]);

  const updateUser = () => {
    setIsLoading(true)
    editUser(user.id, { email: user.email, role, image_url: picture }, token).then(() => {
      setIsLoading(false);
      getUsers(token).then(res => {
        updateUsers(res.data);
      })
      close();
    }).catch(() => {
      alert.error('Error');
      setIsLoading(false);
      close();
    });
  };

  const handlePictureChange = async ({ target }) => {
    setIsLoading(true)
    try {
      const res = await uploadPicture(user.id, target.name, target.files[0], token);
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
          <IntlMessages id='forms.title-edituser' />
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
                  defaultValue={options.filter(o => o.value === role)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pictureInput' sm={3}>
                <IntlMessages id='forms.picture' />
              </Label>
              <Col className='align-self-center align-items-center' sm={9}>
                <ImageUpload defaultImage={picture} id='pictureInput' name='user' onChange={handlePictureChange} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={updateUser}>
            {isLoading
              ? <Spinner size='sm' color='light' />
              : <IntlMessages id='button.edit' />
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

UserEditModal.propTypes = {
  oldUser: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
  updateUsers: PropTypes.func.isRequired
}

export default UserEditModal
