import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { Button, CardDeck, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import ScoreCard from '../../components/ScoreCard';
import ScoreCreateModal from '../../components/ScoreCreateModal';
import Spinner from '../../components/Spinner';
import { getQuestions } from '../../util/fetch/score';
import IntlMessages from '../../util/IntlMessages';

const ScoreContainer = ({ match, token, history }) => {
  const [questions, setQuestions] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const clientId = parseInt(match.params.id, 10);
  const alert = useAlert();

  const loadQuestions = () => {
    getQuestions(token, clientId)
      .then(res => {
        setQuestions(res.data);
      })
      .catch(() => {
        alert.error('Error');
      })
  };

  useEffect(() => {
    loadQuestions();
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
          {
            (questions && questions.length < 3) &&
            <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
              <IntlMessages id='button.add' />
            </Button>
          }
        </Colxx>
      </Row>
      <CardDeck>
        {questions ?
          <Row style={{ width: '100%' }}>
            {questions.length > 0 ? questions.map(question => (
              <Colxx className='mb-5' xs='12' md='6' xl='4' key={question.id}>
                <ScoreCard
                  token={token}
                  clientId={clientId}
                  loadQuestions={loadQuestions}
                  {...question}
                />
              </Colxx>)) : <Message><IntlMessages id='forms.not-have-questions' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>
      <ScoreCreateModal
        updateQuestions={() => loadQuestions()}
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        clientId={clientId}
      />
    </Fragment>
  );
};

export default withRouter(ScoreContainer);
