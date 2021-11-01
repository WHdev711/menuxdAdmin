import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { Button, CardDeck, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import PromotionCard from '../../components/PromotionCard';
import PromotionCreateModal from '../../components/PromotionCreateModal';
import Spinner from '../../components/Spinner';
import { getPromotions } from '../../util/fetch/promotion';
import IntlMessages from '../../util/IntlMessages';

const PromotionContainer = ({ match, token, history, settings }) => {
  const [promotions, setPromotions] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const clientId = parseInt(match.params.id, 10);
  const alert = useAlert();

  const loadPromotions = () => {
    getPromotions(token, clientId)
      .then(res => {
        setPromotions(res.data);
      })
      .catch(() => {
        alert.error('Error');
      })
  };

  useEffect(() => {
    loadPromotions();
  }, [clientId]);

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.promotions' /></h1>
        </Colxx>
      </Row>
      <Row className='mb-3'>
        <Colxx xs='2' className='ml-auto mr-1' >
          <GoBackButton history={history} />
        </Colxx>
        <Colxx xs='4'>
          <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
            <IntlMessages id='button.add' />
          </Button>
        </Colxx>
      </Row>
      <CardDeck>
        {promotions ?
          <Row style={{ width: '100%' }}>
            {promotions.length > 0 ? promotions.map(promotion => (
              <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={promotion.id}>
                <PromotionCard
                  token={token}
                  clientId={clientId}
                  loadPromotions={loadPromotions}
                  locale={settings.locale}
                  {...promotion}
                />
              </Colxx>)) : <Message><IntlMessages id='forms.not-have-promotions' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>
      <PromotionCreateModal
        updatePromotions={() => loadPromotions()}
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        clientId={clientId}
        locale={settings.locale}
      />
    </Fragment>
  )
}

export default withRouter(PromotionContainer)
