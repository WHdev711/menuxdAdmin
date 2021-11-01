import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import AdEditModal from '../../components/AdEditModal';
import { deleteAd, patchAd } from '../../util/fetch/ad';
import IntlMessages from '../../util/IntlMessages';


const AdCard = ({ id, active, picture, clientId, title, token, loadAds }) => {
  const [updateModal, setUpdateModal] = useState(false)
  const [actionModal, setActionModal] = useState(false)

  const currentAd = {
    id,
    active,
    picture,
    title,
    clientId
  };

  const deleteById = async (id) => {
    try {
      await deleteAd(id, token);
      loadAds();
      setActionModal(false);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const updateActive = async () => {
    try {
      await patchAd(id, { active: !active }, token)
      loadAds()
    } catch (error) {
      alert.error(error.message);
    }
  };

  return (
    <Fragment>
      <Card>
        <CardImg
          style={{ cursor: 'pointer', transition: 'all .5s', filter: active ? null : 'grayscale(100%)' }}
          src={picture}
          alt='Card image cap'
          onClick={updateActive}
        />
        <CardBody>
          <CardTitle className='text-center mb-1'>
            <h1 className='text-center'>{title}</h1>
          </CardTitle>
          <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
            <Button onClick={() => setUpdateModal(true)} color='primary' >
              <IntlMessages id='button.edit' />
            </Button>
            <Button onClick={() => setActionModal(true)} color='secondary' >
              <IntlMessages id='button.delete' />
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card >
      <AdEditModal
        token={token}
        oldAd={currentAd}
        updateAds={() => loadAds()}
        open={updateModal}
        clientId={clientId}
        close={() => setUpdateModal(false)}
      />

      <ActionModal
        action={() => deleteById(id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-ad' /> {' '}?
       </ActionModal>
    </Fragment>
  )
}

AdCard.propTypes = {
  id: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  picture: PropTypes.string.isRequired,
  clientId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  loadAds: PropTypes.func.isRequired,
};

export default AdCard;
