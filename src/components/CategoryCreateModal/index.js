import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import { createCategory, getCategories } from '../../util/fetch/category';
import { uploadPicture } from '../../util/fetch/picture';
import IntlMessages from '../../util/IntlMessages';


const CategoryCreateModal = ({ open, close, className, updateCategories, clientId, userId, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(false);
  const [picture, setPicture] = useState('');
  const [suggested1, setSuggested1] = useState(null);
  const [suggested2, setSuggested2] = useState(null);
  const [suggested3, setSuggested3] = useState(null);
  const [categories, setCategories] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    getCategories(clientId, token)
      .then(res => {
        setCategories(res.data);
      }).catch(() => alert.error('Error'));
  }, []);

  const cleanForm = () => {
    setTitle('');
    setPriority(false);
    setPicture('');
    setSuggested1(null)
    setSuggested2(null)
    setSuggested3(null)
  };

  const addCategory = () => {
    setIsLoading(true);
    createCategory({ title, picture, priority, client_id: clientId, suggested1: parseInt(suggested1, 10), suggested2: parseInt(suggested2, 10), suggested3: parseInt(suggested3, 10) }, token)
      .then(() => {
        setIsLoading(false);
        cleanForm();
        getCategories(clientId, token).then(res => {
          updateCategories(res.data);
        })
        close();
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
        close();
      });
  };

  const handlePictureChange = ({ target }) => {
    setIsLoading(true);
    uploadPicture(userId, target.name, target.files[0], token)
      .then(res => {
        setPicture(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        alert.error('Error');
      });
  };

  return (
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-addcategory' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for='titleInput' sm={3}>
                <IntlMessages id='forms.title' />
              </Label>
              <Col sm={9}>
                <Input
                  className='form-control'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type='text'
                  name='title'
                  id='titleInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='priorityInput' sm={3}>
                <IntlMessages id='forms.priority' />
              </Label>
              <Col sm={9}>
                <CustomInput defaultChecked={priority} onChange={e => setPriority(e.target.checked)} type='switch' id='priorityInput' />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='suggestedInput' sm={3}>
                <IntlMessages id='forms.suggested' />
              </Label>
              <Col sm={9}>
                <Select
                  options={categories.map(c => ({ label: c.title, value: c.id }))}
                  onChange={e => setSuggested1(e.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='suggestedInput' sm={3}>
                <IntlMessages id='forms.suggested' />
              </Label>
              <Col sm={9}>
                <Select
                  options={categories.map(c => ({ label: c.title, value: c.id }))}
                  onChange={e => setSuggested2(e.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='suggestedInput' sm={3}>
                <IntlMessages id='forms.suggested' />
              </Label>
              <Col sm={9}>
                <Select
                  options={categories.map(c => ({ label: c.title, value: c.id }))}
                  onChange={e => setSuggested3(e.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pictureInput' sm={3}>
                <IntlMessages id='forms.picture' /> <i id="UncontrolledTooltipPictureInfo" className='iconsmind-Information' />
                <UncontrolledTooltip className="color-primary" color='primary' placement="right" target="UncontrolledTooltipPictureInfo">
                  Recommended size:<br />
                  90 x 45<br />
                  PNG without background
                </UncontrolledTooltip>
              </Label>
              <Col className='align-self-center' sm={9}>
                <ImageUpload id='pictureInput' name='category' onChange={handlePictureChange} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} color='primary' onClick={addCategory}>
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
  );
};

CategoryCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateCategories: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
};

export default CategoryCreateModal;
