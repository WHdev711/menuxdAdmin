import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardTitle } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import ScoreEditModal from '../../components/ScoreEditModal';
import { deleteQuestion } from '../../util/fetch/score';
import IntlMessages from '../../util/IntlMessages';


const ScoreCard = ({ id, text, client_id: clientId, token, loadQuestions }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);

  const currentQuestion = {
    id,
    text,
    clientId
  };

  const deleteQuestionById = async (id) => {
    try {
      await deleteQuestion(id, token);
      loadQuestions();
      setActionModal(false);
    } catch (error) {
      alert.error('Error');
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className='text-center mb-1'>
            <h1 className='text-center'>{text}</h1>
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
      <ScoreEditModal
        token={token}
        currentQuestion={currentQuestion}
        updateQuestions={() => loadQuestions()}
        open={updateModal}
        clientId={clientId}
        close={() => setUpdateModal(false)}
      />

      <ActionModal
        action={() => deleteQuestionById(id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-question' />?
       </ActionModal>
    </Fragment>
  );
};

ScoreCard.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  client_id: PropTypes.number.isRequired
};

export default ScoreCard;
