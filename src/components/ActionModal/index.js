import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

import IntlMessages from '../../util/IntlMessages'

const ActionModal = ({ open, close, action, children }) => (
  <Modal isOpen={open} toggle={close}>
    <ModalBody>
      {children}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={action}>
        <IntlMessages id='button.accept' />
      </Button>{' '}
      <Button color="secondary" onClick={close}>
        <IntlMessages id='button.cancel' />
      </Button>
    </ModalFooter>
  </Modal>
)

ActionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default ActionModal
