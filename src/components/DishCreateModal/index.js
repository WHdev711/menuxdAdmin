import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import Ingredients from '../../components/Ingredients';
import { getCategories } from '../../util/fetch/category';
import { createDish } from '../../util/fetch/dish';
import { uploadPicture } from '../../util/fetch/picture';
import IntlMessages from '../../util/IntlMessages';

const DishCreateModal = ({ open, close, className, updateDishes, clientId, userId, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [suggested, setSuggested] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [picture1, setPicture1] = useState(null);
  const [picture2, setPicture2] = useState(null);
  const [picture3, setPicture3] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isHalf, setIsHalf] = useState(false);
  const [halfPrice, setHalfPrice] = useState(price / 2);
  const alert = useAlert();

  const style = {
    width: '120px',
    height: '120px',
    margin: '.2rem auto'
  };

  useEffect(() => {
    setIsLoading(true)
    getCategories(clientId, token)
      .then((res) => {
        setIsLoading(false);
        setCategories(res.data);
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
      })
  }, []);

  const cleanForm = () => {
    setDescription('');
    setName('');
    setAvailable(false);
    setSuggested(false);
    setIngredients([]);
    setCategoryId('');
    setPicture1('');
    setPicture2('');
    setPicture3('');
    setPrice(0);
    setIsHalf(false);
    setHalfPrice(price / 2);
  };

  const addDish = () => {
    setIsLoading(true);
    const data = {
      name,
      description,
      available,
      suggested,
      price,
      ingredients,
      category_id: parseInt(categoryId, 10),
      pictures: [picture1, picture2, picture3],
      client_id: clientId,
      is_half: isHalf,
      half_price: isHalf ? halfPrice : null
    };
    createDish(data, token)
      .then(() => {
        setIsLoading(false)
        cleanForm()
        updateDishes()
        close()
      })
      .catch(() => {
        alert.error('Error')
        setIsLoading(false)
        close()
      });
  };

  const handlePictureChange = ({ target }) => {
    setIsLoading(true)
    uploadPicture(userId, target.name, target.files[0], token)
      .then(res => {
        setIsLoading(false)
        switch (target.name) {
          case 'dish-01':
            setPicture1(res.data)
            break
          case 'dish-02':
            setPicture2(res.data)
            break
          case 'dish-03':
            setPicture3(res.data)
            break
          default:
            return
        }
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
          <IntlMessages id='forms.title-adddish' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for='titleInput' sm={3}>
                <IntlMessages id='forms.name' />
              </Label>
              <Col sm={9}>
                <Input
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  name='name'
                  id='titleInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='descriptionInput' sm={3}>
                <IntlMessages id='forms.description' />
              </Label>
              <Col sm={9}>
                <Input
                  className='form-control'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  type='textarea'
                  name='description'
                  id='descriptionInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='priceInput' sm={3}>
                <IntlMessages id='forms.price' />
              </Label>
              <Col sm={9}>
                <Input
                  className='form-control'
                  value={price}
                  onChange={e => setPrice(parseInt(e.target.value))}
                  type='number'
                  name='price'
                  id='priceInput'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='categoryInput' sm={3}>
                <IntlMessages id='forms.category' />
              </Label>
              <Col sm={9}>
                <Select
                  options={categories.map(c => ({ label: c.title, value: c.id }))}
                  onChange={e => setCategoryId(e.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='pictureInput' sm={12}>
                <IntlMessages id='forms.pictures' />
              </Label>
              <Col sm={12}>
                <Row>
                  <Col sm={4}>
                    <ImageUpload style={style} name='dish-01' onChange={handlePictureChange} />
                  </Col>
                  <Col sm={4}>
                    <ImageUpload style={style} name='dish-02' onChange={handlePictureChange} />
                  </Col>
                  <Col sm={4}>
                    <ImageUpload style={style} name='dish-03' onChange={handlePictureChange} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='isHalfInput' sm={3}>
                <IntlMessages id='forms.half-price' />
              </Label>
              <Col sm={9}>
                <CustomInput
                  type='switch'
                  id='isHalfInput'
                  defaultChecked={isHalf}
                  onChange={e => setIsHalf(e.target.checked)}
                />
              </Col>
            </FormGroup>
            {
              isHalf && (
                <FormGroup row>
                  <Label for='halfPriceInput' sm={3}>
                    <IntlMessages id='forms.is-half' />
                  </Label>
                  <Col sm={9}>
                    <Input
                      className='form-control'
                      defaultValue={halfPrice}
                      onChange={e => setHalfPrice(parseInt(e.target.value))}
                      type='number'
                      name='halfPrice'
                      id='halfPriceInput'
                    />
                  </Col>
                </FormGroup>
              )
            }
            <FormGroup row>
              <Label for='ingredientsInput' sm={12}>
                <IntlMessages id='forms.ingredients' />
              </Label>
              <Col sm={9}>
                <Ingredients ingredients={ingredients} updateIngredients={(i) => setIngredients(i)} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} color='primary' onClick={addDish}>
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
};

DishCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateDishes: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired
};

export default DishCreateModal;
