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
  bottom: '2rem',
  right: '2rem',
  zIndex: 10
}

const AddButton = ({ onClick, style }) => (
  <Button color='primary' onClick={onClick} style={{...style, ...styles}}>+</Button>
)

AddButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default AddButton
