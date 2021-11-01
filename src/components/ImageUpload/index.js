import React from 'react'
import PropTypes from 'prop-types'

import styles from './ImageUpload.module.css'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 'pictureFileInput',
      imageURI: this.props.defaultImage || null
    }
  }

  buildImgTag() {
    let imgTag = this.state.imageURI !== null ?
      <img className={styles.image} src={this.state.imageURI} alt='preview' /> : null
    return imgTag
  }

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader()
      reader.onload = function (ev) {
        this.setState({ imageURI: ev.target.result })
      }.bind(this)
      reader.readAsDataURL(e.target.files[0])
    }
  }

  handleChange(e) {
    this.readURI(e)
    if (this.props.onChange !== undefined) {
      this.props.onChange(e)
    }
  }

  render() {
    const imgTag = this.buildImgTag()
    const { name } = this.props
    const id = `${this.state.id}-${name}`

    return (
      <div>
        <label
          style={{ ...this.props.style }}
          htmlFor={id}
          className={styles.label}>
          <p className={styles.text}>
            <i style={styles.star} className='iconsmind-Upload-toCloud' /><br />
            Upload
          </p>
          {imgTag}
        </label>
        <input
          id={id}
          type='file'
          name={name}
          onChange={this.handleChange.bind(this)}
          className={styles.hide}
        />
      </div>
    )
  }
}

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  defaultImage: PropTypes.string
}

export default ImageUpload
