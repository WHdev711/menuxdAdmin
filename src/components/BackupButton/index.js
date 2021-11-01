import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const styles = {
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  padding: '0',
  fontSize: '1.5rem',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  bottom: '6rem',
  right: '2rem',
  zIndex: 10
}

const BackupButton = ({ onClick, style }) => (
  <Button color='secondary' onClick={onClick} style={{...style, ...styles}}>
    <i className='iconsmind-Book' />
  </Button>
)

BackupButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default BackupButton
