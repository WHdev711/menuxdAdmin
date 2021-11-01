import React from 'react';
import Select from 'react-select';

class CustomSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: this.props.defaultValue || null,
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    )
  }
}

export default CustomSelect
