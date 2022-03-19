import React from 'react';
import Select from 'react-select';

// styles
import '../selectBig/selectBigSOComponent.scss'

import  operation  from "../../models/statisticalOperationData"


class SelectBigSOComponent extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });

    this.props.onChangeOperation(selectedOption.value)
  };
  render() {
    const { selectedOption } = this.state;
    
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={operation}
      />
    );
  }
}


export default SelectBigSOComponent