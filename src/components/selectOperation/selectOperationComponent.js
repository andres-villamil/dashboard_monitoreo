import React from 'react';
import Select from 'react-select';

// styles
import '../selectOperation/selectOperation.scss'

// data
//import  operation  from "../../models/statisticalOperationData"


class SelectedComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });

    if (selectedOption === null) {
      this.props.onChangeOperation(selectedOption)
    } else {
      this.props.onChangeOperation(selectedOption.value)
    }
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        options={this.props.oeSchema}
        value={selectedOption}
        onChange={this.handleChange}
        searchable={true}
        isClearable
      />
    );
  }
}


export default SelectedComponent