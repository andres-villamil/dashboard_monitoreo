import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby'

/* styles */
import "../layout/dateActivityComponent.scss"
import Select, { components } from 'react-select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



//import moment from 'moment'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const customStyles = {
    control: () => ({
        backgroundColor: '#B3194F',
        height: '10vh',
        display: 'flex',
        borderRadius: '4px',

    }),
    indicatorsContainer: () => ({
        padding: '3vh 0.5vw',
        backgroundColor: '#731033',
        borderRadius: '4px',

    }),
    singleValue: () => ({
        padding: '1vh 0.5vw',
        fontFamily: 'Oswald',
        fontSize: '2em',
        margin: '0 auto',
        textDecoration: 'none',
        color: '#ffffff !important',
        'a': {
            color: 'white',
        }
    }),

    input: () => ({
        fontFamily: 'Oswald',
        fontSize: '2em',
        color: '#ffffff !important',
    }),
    menu: () => ({
        height: 'auto',
        borderRadius: '4px',
        border: 'solid 1px #e6e6e6',
    }),
    option: (styles, state) => ({
        ...styles,
        padding: '1vh 2vw',
        borderRadius: '4px',
        backgroundColor: state.isSelected ? "#e6e6e6" : 'null',
        'a': {
            color: 'black',
        },
        '&:hover': {
            backgroundColor: '#B3194F',
            'a': {
                color: 'white',
            }
        }

    }),
    dropdownIndicator: () => ({
        color: '#ffffff',
        fontSize: '2em',

    }),



}


export default function useTitleSelectorComponent(props) {

    const options = props.selectorOESchema
    console.log("options", options)
    options.forEach( (item) => (
        console.log("item", item),
        item.link = item.periodicidad.periodicidad    
    ))
    const [selectedOption, setSelectedOption] = useState({ value: props.oeAbrevDefault, label: props.oeDefault, link: options[0].link })

    useEffect(() => {
        renderDateActivitity();
    })

    function renderDateActivitity() {

        setSelectedOption(selectedOption);

    }

    const classes = useStyles();

    const formatOptionLabel = ({value, label, link, periodo}) => (
        <div style={{ display: "flex" }}>
                { props.typeLink === "milestone" && link === "Mensual" ?
                        <Link style={{ textDecoration: "none", }} to={`/${value}/Septiembre-2019/${props.objectSelected.hito.abreviacionHito}`}>
                            {label}({value}) 
                        </Link >
                : props.typeLink === "statisticalOperation" && link === "Mensual" ?
                    <Link style={{ textDecoration: "none", }} to={`/${value}/Septiembre-2019`}>
                         {label}({value}) 
                    </Link > 
                : props.typeLink === "milestone" && link === "Anual" ?
                    <Link style={{ textDecoration: "none", }} to={`/${value}/Año-2018/${props.objectSelected.hito.abreviacionHito}`}>
                         {label}({value}) 
                    </Link >
                : 
                    <Link style={{ textDecoration: "none", }} to={`/${value}/Año-2018`}>
                        {label}({value}) 
                    </Link >                   
                }
        </div>
    )
    
    return (
        <>
        <Paper>
            <Grid container>
                <Grid item xs={12} >
                    <Select
                        styles={customStyles}
                        options={options}
                        value={selectedOption}
                        formatOptionLabel={formatOptionLabel}
                        onChange={selectedOption}
                        placeholder={props.oeAbrevDefault}>
                    </Select >
                </Grid>
            </Grid>
        </Paper>
        </>
        )
}
