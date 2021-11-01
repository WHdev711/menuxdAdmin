import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { createQuestion } from '../../util/fetch/score';
import IntlMessages from '../../util/IntlMessages';

const ScoreCreateModal = ({ open, close, className, updateQuestions, clientId, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const alert = useAlert();

  const cleanForm = () => {
    setText('');
  };

  const addQuestion = async () => {
    setIsLoading(true);
    try {
      const question = {
        text,
        client_id: clientId
      };
      await createQuestion(question, token);
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
    <Fragment>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader toggle={close}>
          <IntlMessages id='forms.title-addquestion' />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Label for='titleInput' sm={3}>
                <IntlMessages id='forms.question' />
              </Label>
              <Col sm={9}>
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
          <Button disabled={isLoading} color='primary' onClick={addQuestion}>
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

ScoreCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateQuestions: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  className: PropTypes.object,
  token: PropTypes.string.isRequired,
};

export default ScoreCreateModal;
