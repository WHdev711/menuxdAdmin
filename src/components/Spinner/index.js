import React from 'react'
import PropTypes from 'prop-types'

import styles from './Spinner.module.css'

const Spinner = ({ style }) => (
  <div style={style} className={styles.spinner}>
    <div className={styles.doubleBounce1}></div>
    <div className={styles.doubleBounce2}></div>
  </div>
)

Spinner.propTypes = {
  style: PropTypes.object
}

export default Spinner
