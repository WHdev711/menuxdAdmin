import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const styles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  padding: '0',
  fontSize: '1.5rem',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10
}

const GoBackButton = ({ history, style }) => (
  <Button
    outline
    color='primary'
    style={{ ...style, ...styles }}
    className='menu-button'
    onClick={() => history.goBack()}
  >
    <i className='iconsmind-Arrow-Back' />
  </Button>
)

GoBackButton.propTypes = {
  history: PropTypes.object.isRequired
}

export default GoBackButton
