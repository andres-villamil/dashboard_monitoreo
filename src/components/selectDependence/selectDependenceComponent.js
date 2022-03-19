import React from 'react';
import Select from 'react-select';

// styles
import '../selectDependence/selectDependence.scss'


//import  dependence  from '../../models/dependence'


class SelectDependenceComponent extends React.Component {
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
      this.props.onChangeDependence(selectedOption)
    } else {
      this.props.onChangeDependence(selectedOption.value)
    }
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        options={this.props.dependenciasSchema}
        value={selectedOption}
        onChange={this.handleChange}
        searchable={true}
        isClearable

      />
    );
  }
}


export default SelectDependenceComponent