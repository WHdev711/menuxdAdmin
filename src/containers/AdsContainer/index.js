import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { Button, CardDeck, Row } from 'reactstrap';
import AdCard from '../../components/AdCard';
import AdCreateModal from '../../components/AdCreateModal';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import { getAds } from '../../util/fetch/ad';
import IntlMessages from '../../util/IntlMessages';


const AdsContainer = ({ match, token, history, settings }) => {
  const [ads, setAds] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const clientId = parseInt(match.params.id, 10);
  const alert = useAlert();

  const loadAds = async () => {
    try {
      const res = await getAds(token, clientId);
      setAds(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, [clientId]);

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.ads' /></h1>
        </Colxx>
      </Row>
      <Row className='mb-3'>
        <Colxx xs='2' className='ml-auto mr-1' >
          <GoBackButton history={history} />
        </Colxx>
        {ads.length < 6 && <Colxx xs='4'>
          <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
            <IntlMessages id='button.add' />
          </Button>
        </Colxx>
        }
      </Row>
      <CardDeck>
        {ads ?
          <Row style={{ width: '100%' }}>
            {ads.length > 0 ? ads.map(ad => (
              <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={ad.id}>
                <AdCard
                  token={token}
                  clientId={clientId}
                  loadAds={loadAds}
                  locale={settings.locale}
                  {...ad}
                />
              </Colxx>)) : <Message><IntlMessages id='forms.not-have-ads' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>
      <AdCreateModal
        updateAds={() => loadAds()}
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        clientId={clientId}
        locale={settings.locale}
      />
    </Fragment>
  )
}

export default withRouter(AdsContainer);
