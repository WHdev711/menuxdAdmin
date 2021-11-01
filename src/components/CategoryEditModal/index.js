import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import { editCategory, getCategories } from '../../util/fetch/category';
import { uploadPicture } from '../../util/fetch/picture';
import IntlMessages from '../../util/IntlMessages';

const CategoryEditModal = ({ oldCategory, open, close, className, updateCategories, token }) => {
  const category = oldCategory;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(category.title);
  const [priority, setPriority] = useState(category.priority);
  const [picture, setPicture] = useState(category.picture);
  const [suggested1, setSuggested1] = useState(category.suggested1);
  const [suggested2, setSuggested2] = useState(category.suggested2);
  const [suggested3, setSuggested3] = useState(category.suggested3);
  const [categories, setCategories] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    getCategories(category.clientId, token).then(res => {
      setCategories(res.data)
    }).catch(() => {
      alert.error('Error');
    });
  }, []);

  const cleanForm = () => {
    setTitle(category.title);
    setPicture(category.picture);
    setSuggested1(category.suggested1);
    setSuggested2(category.suggested2);
    setSuggested3(category.suggested3);
    setPriority(category.priority);
  };

  useEffect(() => cleanForm(), [oldCategory]);

  const updateCategory = () => {
    setIsLoading(true);
    editCategory(category.id, { title, picture, suggested1, suggested2, suggested3, priority }, token)
      .then(() => {
        setIsLoading(false);
        updateCategories();
        close();
      })
      .catch(() => {
        setIsLoading(false);
        alert.error('Error');
        close()
      });
  };

  const handlePictureChange = ({ target }) => {
    setIsLoading(true);
    uploadPicture(category.clientId, target.name, target.files[0], token)
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
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editcategory' />
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
              <IntlMessages id='forms.suggested' />1
            </Label>
            <Col sm={9}>
              <Select
                options={categories.map(c => ({ label: c.title, value: c.id }))}
                onChange={e => setSuggested1(e.value)}
                defaultValue={categories.map(c => ({ label: c.title, value: c.id }))
                  .filter(c => c.value === suggested1)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='suggestedInput' sm={3}>
              <IntlMessages id='forms.suggested' />2
            </Label>
            <Col sm={9}>
              <Select
                options={categories.map(c => ({ label: c.title, value: c.id }))}
                onChange={e => setSuggested2(e.value)}
                defaultValue={categories.map(c => ({ label: c.title, value: c.id }))
                  .filter(c => c.value === suggested2)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='suggestedInput' sm={3}>
              <IntlMessages id='forms.suggested' />3
            </Label>
            <Col sm={9}>
              <Select
                options={categories.map(c => ({ label: c.title, value: c.id }))}
                onChange={e => setSuggested3(e.value)}
                defaultValue={categories.map(c => ({ label: c.title, value: c.id }))
                  .filter(c => c.value === suggested3)}
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
              <ImageUpload
                defaultImage={category.picture}
                id='pictureInput'
                name='category'
                onChange={handlePictureChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updateCategory}>
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
  );
};

CategoryEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  oldCategory: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
  updateCategories: PropTypes.func.isRequired
};

export default CategoryEditModal;
