import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const OrderNotification = ({ target, image, date, message} ) => (
  <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
    <Link to={target}>
      <img
        src={image}
        alt='Notification'
        className='img-thumbnail list-thumbnail xsmall border-0 rounded-circle'
      />
    </Link>
    <div className='pl-3 pr-2'>
      <Link to={target}>
        {
          message &&
            <p className='font-weight-medium mb-1'>
              {message}
            </p>
        }
        <p className='text-muted mb-0 text-small'>
          {date}
        </p>
      </Link>
    </div>
  </div>
)

OrderNotification.propTypes = {
  target: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  message: PropTypes.string,
  date: PropTypes.string.isRequired,
}

export default OrderNotification
