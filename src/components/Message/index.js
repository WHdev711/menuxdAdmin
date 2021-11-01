import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  container: {
    minWidth: '250px',
    maxWidth: '500px',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem auto'
  },
  icon: {
    display: 'block',
    fontSize: '8rem',
    height: 'auto'
  },
  text: {
    textAlign: 'center',
    marginTop: '.8rem',
    fontSize: '2rem'
  }
}

const Message = ({ style, className, children }) => (
  <div className={className} style={{ ...styles.container, ...style }}>
    <i className='iconsmind-Information' style={styles.icon} />
    <h2 style={styles.text}>{children}</h2>
  </div>
)

Message.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.object.isRequired,
}

export default Message
