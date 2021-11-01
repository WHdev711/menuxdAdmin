import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledTooltip } from 'reactstrap';
import ImageUpload from '../../components/ImageUpload';
import { editAd } from '../../util/fetch/ad';
import { uploadPicture } from '../../util/fetch/picture';
import IntlMessages from '../../util/IntlMessages';

const AdEditModal = ({ oldAd, open, close, className, updateAds, token, clientId }) => {
  const ad = oldAd;
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(ad.picture);
  const [title, setTitle] = useState(ad.title);
  const alert = useAlert();

  const cleanForm = () => {
    setPicture(ad.picture);
  };

  const updateAd = async () => {
    setIsLoading(true);
    try {
      await editAd(ad.id, { picture, title }, token);
      setIsLoading(false);
      cleanForm();
      updateAds();
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
      const res = await uploadPicture(clientId, target.name, target.files[0], token);
      setPicture(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert.error('Error');
    }
  };

  useEffect(() => cleanForm(), [oldAd]);

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editad' />
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
            <Label for='pictureInput' sm={3}>
              <IntlMessages id='forms.picture' /> <i id="UncontrolledTooltipPictureInfo" className='iconsmind-Information' />
              <UncontrolledTooltip className="color-primary" color='primary' placement="right" target="UncontrolledTooltipPictureInfo">
                Recommended size:<br />
                840 x 240
              </UncontrolledTooltip>
            </Label>
            <Col className='align-self-center' sm={9}>
              <ImageUpload
                id='pictureInput'
                name='category'
                defaultImage={picture}
                onChange={handlePictureChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updateAd}>
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
  );
};

AdEditModal.propTypes = {
  oldAd: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.string,
  updateAds: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  clientId: PropTypes.number.isRequired
};

export default AdEditModal;
