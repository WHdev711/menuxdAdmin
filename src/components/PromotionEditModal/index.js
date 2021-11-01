import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import SelectDays from '../../components/SelectDays';
import { getAllDishes } from '../../util/fetch/dish';
import { uploadPicture } from '../../util/fetch/picture';
import { editPromotion } from '../../util/fetch/promotion';
import IntlMessages from '../../util/IntlMessages';

const PromotionEditModal = ({ oldPromotion, open, close, className, updatePromotions, token, clientId, locale }) => {
  const promotion = oldPromotion;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(promotion.title);
  const [picture, setPicture] = useState(promotion.picture);
  const [days, setDays] = useState(promotion.days);
  const [dish, setDish] = useState(promotion.dish.id);
  const [dishes, setDishes] = useState([]);
  const [startAt, setStartAt] = useState(promotion.start_at);
  const [endAt, setEndAt] = useState(promotion.end_at);
  const alert = useAlert();

  useEffect(() => {
    setIsLoading(true);
    getAllDishes(token, clientId)
      .then((res) => {
        setIsLoading(false);
        setDishes(res.data);
      })
      .catch((err) => {
        alert.error(err.message);
        setIsLoading(false);
      });
  }, []);

  const cleanForm = () => {
    setPicture(promotion.picture);
    setTitle(promotion.title);
    setDays(promotion.days);
    setDish(promotion.dish.id);
    setStartAt(promotion.start_at);
    setEndAt(promotion.end_at);
  };

  const updateDish = async () => {
    setIsLoading(true);
    const data = {
      title, picture, days, dish_id: parseInt(dish),
      start_at: startAt, end_at: endAt
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

  const handlePictureChange = async ({ target }) => {
    setIsLoading(true)
    try {
      const res = await uploadPicture(clientId, target.name, target.files[0], token)
      setPicture(res.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert.error(error.message);
    }
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
            <Label for='dishInput' sm={3}>
              <IntlMessages id='forms.dish' />
            </Label>
            <Col sm={9}>
              <Select
                options={dishes.map(d => ({ label: d.name, value: d.id }))}
                onChange={(e) => setDish(e.value)}
                defaultValue={dishes.map(d => ({ label: d.name, value: d.id }))
                  .filter(d => d.value === dish)}
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
              <ImageUpload defaultImage={picture} id='pictureInput' name='category' onChange={handlePictureChange} />
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
