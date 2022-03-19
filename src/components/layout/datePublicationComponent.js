import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby'


/* styles */
import "../layout/dateActivityComponent.scss"
import Select from 'react-select'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import moment from 'moment'
import localization from 'moment/locale/es'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const customStyles = {
  control: () => ({
    backgroundColor: '#ffffff',
    height: '8vh',
    '@media (width: 1366px)': {
      height: '10vh',
    },
    display: 'flex',
    borderRadius: '4px',

  }),
  indicatorsContainer: () => ({
    padding: '2vh 0.5vw',
    backgroundColor: '#e6e6e6',
    borderRadius: '4px',

  }),
  singleValue: () => ({
    padding: '0vh 0.5vw',
    fontFamily: 'OpenSans',
    fontSize: '1.1rem',
    margin: '0 auto',
    textDecoration: 'none',
    color: '#000000 !important',
    'a': {
      color: '#000000',
    },
    '@media (width: 1366px)': {
      fontSize: '0.8rem',
    },
  }),

  input: () => ({
    fontFamily: 'OpenSans',
    fontSize: '1.2em',
    color: '#000000 !important',
  }),
  menu: () => ({
    height: 'auto',
    borderRadius: '4px',
    border: 'solid 1px #e6e6e6',
  }),
  option: (styles, state) => ({
    ...styles,
    padding: '1vh 2vw',
    backgroundColor: state.isSelected ? "#e6e6e6" : '#ffffff',
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
    color: '#B3194F',
    fontSize: '2em',

  }),

  menuPortal: base => ({ ...base, zIndex: 9999 })

}




export default function useDatePublication(props) {

  
  const options = props.selectorPeriodoSchema.map(item => ({"value": item.hitoOE.periodo.periodo.value, "label":item.hitoOE.periodo.periodo.value})).reduce(
    (accumulator, current) => accumulator.some( x => x.value === current.value ) ? accumulator : [...accumulator, current], [])
  const [selectedOption, setSelectedOption] = useState({ value: props.periodoDefault, label: props.periodoDefault })
  
    options.splice(0, 1)

   const convertFormatDate = e => Object.assign({}, e, {
    fechaPlaneada: new Date(e.fechaPlaneada).setMinutes(new Date(e.fechaPlaneada).getMinutes() + new Date(e.fechaPlaneada).getTimezoneOffset()),

  }); 

  var dataPublication = props.PublicationData.map(convertFormatDate)
  var dataNextHito = props.nextHito.map(convertFormatDate)

  useEffect(() => {
    renderDatePublication();
  })

  function renderDatePublication() {
    console.log("props", props.PublicationData)
  }

  const classes = useStyles();

   const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex" }}>
        <Link style={{ textDecoration: "none" }} to={`/${props.objectSelected.periodo.operacionEstadistica.abreviacion}/${label}/`}>{label}</Link>
    </div>


  )

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  }; 

  return (
    <>
      <Grid container spacing={3} direction="row" className="mt-2">
         <Grid item xs={6} width="auto">
          <Paper className="heightPaper1">
            <Grid container>
              <Grid xs={6} xl={4} className="backgroundFase heightPaper1">
                <p className="titleCardIndicador ml-2 mt-4">Periodo:</p>
              </Grid>
              <Grid item xs >
                <Select
                  styles={customStyles}
                  options={options}
                  value={selectedOption}
                  formatOptionLabel={formatOptionLabel}
                  onChange={handleChange}
                >
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid> 

  

        <Grid item xs={6} width="auto">
          <Paper className="heightPaper1">
            <Grid container>
              <Grid item xs={4} className="backgroundFase heightPaper1">
                <p className="titleCardIndicador ml-2 mt-4">Fecha de Publicación</p>
              </Grid>
              <Grid item xs className="mx-3 my-2 "
              container
              direction = "row"
              justify = "center"
              alignItems = "center" >
                <p className="subTitleCardIndicador">{moment(new Date(dataPublication[0].fechaPlaneada)).locale("es", localization).format("LL")}</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>


               {dataNextHito.map((row, index) => (

          row.estado.nombre === 'En Proceso' ?
            <Grid item xs={12} width="auto">
              <Paper className="heightPaper1">
                <Grid container>
                  <Grid xs={3} xl={2} className="backgroundFase heightPaper1">
                    <p className="titleCardIndicador ml-1">Próximo Hito a cumplirse </p>
                  </Grid>
                  <Grid item xs>
                    <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      >

                      <Grid ><p className="subTitleCardIndicador ml-1 mt-4">{row.hito.nombre}                      
                        <span className="styleDate ml-3"><i>
                        ({moment(new Date(row.fechaPlaneada)).format("DD/MM/YYYY")})
                        </i>
                        </span>
                      </p></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            : <p></p>


        ))}
      </Grid>


 
    </>
  )

} 