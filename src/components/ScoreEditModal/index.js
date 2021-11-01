import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { editQuestion } from '../../util/fetch/score';
import IntlMessages from '../../util/IntlMessages';

const ScoreEditModal = ({ currentQuestion, open, close, className, updateQuestions, token }) => {
  const question = currentQuestion;
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(question.text);
  const alert = useAlert();

  const cleanForm = () => {
    setText(question.text);
  };

  const updateQuestion = async () => {
    setIsLoading(true);
    try {
      await editQuestion(question.id, { text }, token);
      setIsLoading(false);
      cleanForm();
      updateQuestions();
      close();
    } catch (error) {
      alert.error('Error');
      setIsLoading(false);
      close();
    }
  };

  return (
    <Modal isOpen={open} toggle={close} className={className}>
      <ModalHeader toggle={close}>
        <IntlMessages id='forms.title-editquestion' />
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup row>
            <Col sm={12}>
              <Input
                className='form-control'
                value={text}
                onChange={e => setText(e.target.value)}
                type='text'
                name='title'
                id='titleInput'
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color='primary' onClick={updateQuestion}>
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
  );
};

ScoreEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    clientId: PropTypes.number.isRequired
  }),
  close: PropTypes.func.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
  updateQuestions: PropTypes.func.isRequired
};

export default ScoreEditModal;
