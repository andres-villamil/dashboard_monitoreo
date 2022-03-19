import React from 'react';
import Select from 'react-select';

// styles
import '../selectMonth/selectMonth.scss'



class SelectMonthComponent extends React.Component {
    render() {

        const options = [
            { value: 'Enero', label: 'Enero' },
            { value: 'Febrero', label: 'Febrero' },
            { value: 'Marzo', label: 'Marzo' },
            { value: 'Abril', label: 'Abril' },
            { value: 'Mayo', label: 'Mayo' },
            { value: 'Junio', label: 'Junio' },
            { value: 'Julio', label: 'Julio' },
            { value: 'Agosto', label: 'Agosto' },
            { value: 'Septiembre', label: 'Septiembre' },
            { value: 'Octubre', label: 'Octubre' },
            { value: 'Noviembre', label: 'Noviembre' },
            { value: 'Diciembre', label: 'Diciembre' }
        ]

        return (
            <Select
                defaultValue={options[8]}
              
                options={options} />
        );
    }
}


export default SelectMonthComponent