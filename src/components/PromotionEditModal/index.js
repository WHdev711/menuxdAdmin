import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import SelectDays from '../../components/SelectDays';
import IngredientsPromo from '../../components/Ingredients _Promo';
import { uploadPicture } from '../../util/fetch/picture';
import { editPromotion } from '../../util/fetch/promotion';
import IntlMessages from '../../util/IntlMessages';

const PromotionEditModal = ({ oldPromotion, open, close, className, updatePromotions, token, clientId, locale }) => {
  const promotion = oldPromotion;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(promotion.title);
  const [picture1, setPicture1] = useState(promotion.pictures[0]);
  const [picture2, setPicture2] = useState(promotion.pictures[1]);
  const [days, setDays] = useState(promotion.days);
  const [description, setDescription] = useState(promotion.description);
  const [price, setPrice] = useState(promotion.price);
  const [ingredients, setIngredients] = useState(promotion.ingredients);
  const [startAt, setStartAt] = useState(promotion.start_at);
  const [endAt, setEndAt] = useState(promotion.end_at);
  const alert = useAlert();

  const cleanForm = () => {
    setPicture1(promotion.pictures[0]);
    setPicture2(promotion.pictures[1]);
    setTitle(promotion.title);
    setDays(promotion.days);
    setDescription(promotion.description);
    setPrice(promotion.price);
    setIngredients(promotion.ingredients);
    setStartAt(promotion.start_at);
    setEndAt(promotion.end_at);
  };

  const style1 = {
    width: '150px',
    height: '150px',
    margin: '.2rem auto'
  };

  const style2 = {
    width: '120px',
    height: '120px',
    margin: '.2rem auto'
  };

  const updatePromotion = async () => {
    setIsLoading(true);
    const data = {
      title, pictures: [picture1, picture2], days,
      start_at: startAt, end_at: endAt, description, price, ingredients
    };
    try {
      await editPromotion(promotion.id, data, token)
      setIsLoading(false);
      cleanForm();
      updatePromotions();
      close();
    } catch (error) {
      alert.error(error.message);
      setIsLoading(false);
      close();
    }
  };

  const handlePictureChange = ({ target }) => {
    setIsLoading(true);
    uploadPicture(clientId, target.name, target.files[0], token)
      .then(res => {
        setIsLoading(false);
        switch (target.name) {
          case 'promotion-01':
            setPicture1(res.data);
            break;
          case 'promotion-02':
            setPicture2(res.data);
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

  useEffect(() => cleanForm(), [oldPromotion]);

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editpromotion' />
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
            <Label for='selectDays' sm={3}>
              <IntlMessages id='forms.days' />
            </Label>
            <Col sm={9}>
              <SelectDays
                locale={locale}
                days={days}
                updateDays={(d) => setDays(d)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='selectDays' sm={3}>
              <IntlMessages id='forms.start' />
            </Label>
            <Col sm={9}>
              <Input value={startAt} onChange={e => setStartAt(e.target.value)} type="time" name="selectDays" id="selectDays" multiple />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='selectDays' sm={3}>
              <IntlMessages id='forms.end' />
            </Label>
            <Col sm={9}>
              <Input value={endAt} onChange={e => setEndAt(e.target.value)} type="time" name="selectDays" id="selectDays" multiple />
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
            <Label for='pictureInput' sm={3}>
              <IntlMessages id='forms.picture' /> <i id="UncontrolledTooltipPictureInfo" className='iconsmind-Information' />
              <UncontrolledTooltip className="color-primary" color='primary' placement="right" target="UncontrolledTooltipPictureInfo">
                Recommended size:<br />
                420 x 250
                </UncontrolledTooltip>
            </Label>
            <Col className='align-self-center' sm={9}>
              <Row>
                <Col sm={6}>
                  <ImageUpload defaultImage={promotion.pictures[0]} style={style1} name='promotion-01' onChange={handlePictureChange} />
                </Col>
                <Col sm={3}>
                  <ImageUpload defaultImage={promotion.pictures[1]} style={style2} name='promotion-02' onChange={handlePictureChange} />
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='ingredientsInput' sm={12}>
              <IntlMessages id='forms.ingredients' />
            </Label>
            <Col className='mr-5' sm={8}>
              <IngredientsPromo ingredients={ingredients} updateIngredients={(i) => setIngredients(i)} />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updatePromotion}>
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
  )
}

PromotionEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  oldPromotion: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
  updatePromotions: PropTypes.func.isRequired
}

export default PromotionEditModal
