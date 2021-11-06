import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Row, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import SelectDays from '../../components/SelectDays';
import IngredientsPromo from '../../components/Ingredients _Promo';
import { uploadPicture } from '../../util/fetch/picture';
import { createPromotion } from '../../util/fetch/promotion';
import IntlMessages from '../../util/IntlMessages';

const PromotionCreateModal = ({ open, close, className, updatePromotions, clientId, token, locale }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [picture1, setPicture1] = useState(null);
  const [picture2, setPicture2] = useState(null);
  const [days, setDays] = useState([]);
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const alert = useAlert();

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

  const cleanForm = () => {
    setTitle('');
    setDays([]);
    setDescription('');
    setPrice(0);
    setPicture1('');
    setPicture2('');
    setIngredients([]);
  };

  const addPromotion = async () => {
    setIsLoading(true);
    try {
      const promotion = {
        title, pictures: [picture1, picture2], days, start_at: startAt,
        end_at: endAt, description, price, ingredients, client_id: clientId
      };
      await createPromotion(promotion, token);
      setIsLoading(false);
      cleanForm();
      updatePromotions();
      close();
    } catch (error) {
      alert.error('Error');
      setIsLoading(false);
      close();
    }
  };

  // const handlePictureChange = async ({ target }) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await uploadPicture(clientId, target.name, target.files[0], token)
  //     setPicture(res.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     alert.error('Error');
  //   }
  // };
  const handlePictureChange = ({ target }) => {
    setIsLoading(true)
    uploadPicture(clientId, target.name, target.files[0], token)
      .then(res => {
        setIsLoading(false)
        switch (target.name) {
          case 'promotion-01':
            setPicture1(res.data)
            break
          case 'promotion-02':
            setPicture2(res.data)
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
          <IntlMessages id='forms.title-addpromotion' />
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
                    <ImageUpload style={style1} name='promotion-01' onChange={handlePictureChange} />
                  </Col>
                  <Col sm={3}>
                    <ImageUpload style={style2} name='promotion-02' onChange={handlePictureChange} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='ingredientsInput' sm={12}>
                <IntlMessages id='forms.ingredients' />
              </Label>
              <Col sm={9}>
                <IngredientsPromo ingredients={ingredients} updateIngredients={(i) => setIngredients(i)} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} color='primary' onClick={addPromotion}>
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

PromotionCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updatePromotions: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
};

export default PromotionCreateModal;
