import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import { getAds } from '../../util/fetch/ad';
import { getOrders } from '../../util/fetch/order';
import { getPromotions } from '../../util/fetch/promotion';
import { getQuestions } from '../../util/fetch/score';
import { getStays } from '../../util/fetch/stay';
import IntlMessages from '../../util/IntlMessages';
import { getClicksGraph, getOrdersGraph, getScoreGraph, getStayGraph, getTopGraph } from './graphics';

const styles = {
  title: { textAlign: "center" }
};

const ChartsContainer = ({ match, token, history }) => {
  const [questions, setQuestions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [ads, setAds] = useState([]);
  const [stays, setStays] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isMonth, setIsMonth] = useState(false);
  const clientId = parseInt(match.params.id, 10);
  const alert = useAlert();

  const loadQuestions = async () => {
    try {
      const res = await getQuestions(token, clientId);
      setQuestions(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const loadPromotions = async () => {
    try {
      const res = await getPromotions(token, clientId);
      setPromotions(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const loadAds = async () => {
    try {
      const res = await getAds(token, clientId);
      setAds(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const loadStays = async () => {
    try {
      const res = await getStays(token, clientId);
      setStays(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await getOrders(clientId, token);
      setOrders(res.data);
    } catch (error) {
      alert.error(error.message);
    }
  };

  useEffect(() => {
    loadQuestions();
    loadPromotions();
    loadAds();
    loadStays();
    loadOrders();
  }, [clientId]);

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.statistics' /></h1>
        </Colxx>
        <Colxx xs='2' className='ml-auto mr-1' >
          <GoBackButton history={history} />
        </Colxx>
      </Row>
      <Row>
        <Colxx>
          <Card className="p-3 mb-3">
            <CardBody>
              <CardTitle className='text-center mb-1'>
                <h3 style={styles.title}><IntlMessages id='label.sales' /></h3>
              </CardTitle>
              {getOrdersGraph(orders, isMonth)}
              <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
                <Button disabled={!isMonth} onClick={() => setIsMonth(false)} color='secondary' >
                  <IntlMessages id='label.year' />
                </Button>
                <Button disabled={isMonth} onClick={() => setIsMonth(true)} color='primary' >
                  <IntlMessages id='label.month' />
                </Button>
              </ButtonGroup>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.most-requested' /></h3>
            {getTopGraph(orders, 5)}
          </Card>
        </Colxx>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.less-requested' /></h3>
            {getTopGraph(orders, 5, true)}
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.clicks-promotions' /></h3>
            {getClicksGraph(promotions)}
          </Card>
        </Colxx>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.advertising-clicks' /></h3>
            {getClicksGraph(ads)}
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.quality-service' /></h3>
            {getScoreGraph(questions)}
          </Card>
        </Colxx>
        <Colxx lg="6">
          <Card className="p-3 mb-3">
            <h3 style={styles.title}><IntlMessages id='label.user-stay' /></h3>
            {getStayGraph(stays)}
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
};

export default withRouter(ChartsContainer);
