import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import Ingredients from '../../components/Ingredients';
import { getCategories } from '../../util/fetch/category';
import { editDish } from '../../util/fetch/dish';
import { uploadPicture } from '../../util/fetch/picture';
import IntlMessages from '../../util/IntlMessages';

const DishEditModal = ({ oldDish, open, close, className, updateDishes, clientId, token }) => {
  const dish = oldDish;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(dish.price);
  const [ingredients, setIngredients] = useState(dish.ingredients);
  const [categoryId, setCategoryId] = useState(dish.category ? dish.category.id : null);
  const [picture1, setPicture1] = useState(dish.pictures[0]);
  const [picture2, setPicture2] = useState(dish.pictures[1]);
  const [picture3, setPicture3] = useState(dish.pictures[3]);
  const [categories, setCategories] = useState([]);
  const [isHalf, setIsHalf] = useState(dish.isHalf);
  const [halfPrice, setHalfPrice] = useState(dish.isHalf ? dish.halfPrice : dish.price / 2);
  const alert = useAlert();

  const style = {
    width: '120px',
    height: '120px',
    margin: '.2rem auto'
  };

  const updateDish = () => {
    setIsLoading(true);
    const data = {
      name,
      description,
      price,
      ingredients,
      category_id: categoryId ? parseInt(categoryId, 10) : 0,
      pictures: [picture1, picture2, picture3],
      is_half: isHalf,
      half_price: isHalf ? halfPrice : null
    };
    editDish(dish.id, data, token)
      .then(() => {
        setIsLoading(false);
        cleanForm();
        updateDishes();
        close();
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
        close();
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories(clientId, token)
      .then((res) => {
        setIsLoading(false);
        setCategories(res.data);
      })
      .catch(() => {
        alert.error('Error');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => cleanForm(), [oldDish, open]);

  const cleanForm = () => {
    setDescription(dish.description);
    setName(dish.name);
    setIngredients(dish.ingredients);
    setCategoryId(dish.category ? dish.category.id : null);
    setPicture1(dish.pictures[0]);
    setPicture2(dish.pictures[1]);
    setPicture3(dish.pictures[2]);
    setIsHalf(dish.isHalf);
    setHalfPrice(dish.isHalf ? dish.halfPrice : dish.price / 2);
  };

  const handlePictureChange = ({ target }) => {
    setIsLoading(true);
    uploadPicture(clientId, target.name, target.files[0], token)
      .then(res => {
        setIsLoading(false);
        switch (target.name) {
          case 'dish-01':
            setPicture1(res.data);
            break;
          case 'dish-02':
            setPicture2(res.data);
            break;
          case 'dish-03':
            setPicture3(res.data);
            break;
          default:
            return;
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert.error('Error');
      });
  };

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editdish' />
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
                defaultValue={categories.map(c => ({ label: c.title, value: c.id }))
                  .filter(c => c.value === categoryId)}
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
                  <ImageUpload defaultImage={dish.pictures[0]} style={style} name='dish-01' onChange={handlePictureChange} />
                </Col>
                <Col sm={4}>
                  <ImageUpload defaultImage={dish.pictures[1]} style={style} name='dish-02' onChange={handlePictureChange} />
                </Col>
                <Col sm={4}>
                  <ImageUpload defaultImage={dish.pictures[2]} style={style} name='dish-03' onChange={handlePictureChange} />
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
            <Col className='mr-5' sm={8}>
              <Ingredients ingredients={ingredients} updateIngredients={(i) => setIngredients(i)} />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updateDish}>
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

DishEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  oldDish: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
  updateDishes: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired
};

export default DishEditModal;
