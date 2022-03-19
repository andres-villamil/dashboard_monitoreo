import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby'

/* styles */
import "../layout/dateActivityComponent.scss"
import Select from 'react-select'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import moment from 'moment'

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
      marginTop: '3vh',
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
    },
    zIndex: '10000',

  }),
  dropdownIndicator: () => ({
    color: '#B3194F',
    fontSize: '2em',

  }),


}




export default function useDateActivitity(props) {

  const options = props.selectorPeriodoSchema.map(item => ({"value": item.hitoOE.periodo.periodo.value, "label":item.hitoOE.periodo.periodo.value})).reduce(
      (accumulator, current) => accumulator.some( x => x.value === current.value ) ? accumulator : [...accumulator, current], [])
  
 
  const [selectedOption, setSelectedOption] = useState({ value: props.periodoDefault, label: props.periodoDefault })
  options.splice(0, 1)
  useEffect(() => {
    renderDateActivitity();
  })

  function renderDateActivitity() {

  }

  const classes = useStyles();

  console.log("options periodo", options)

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex" }}>
        <Link style={{ textDecoration: "none" }} to={`/${props.objectSelected.periodo.operacionEstadistica.abreviacion}/${label}/${props.objectSelected.hito.abreviacionHito}`}>{label}</Link>
    </div>


  )

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  };

  const ejecucionValue = props.objectSelected.fechaEjecucion;
  var dateInicial = moment(props.objectSelected.fechaPlaneada).format("YYYY-MM-DD");
  var dateFinal = moment(props.objectSelected.fechaEjecucion).format("YYYY-MM-DD");
  var days = moment(dateFinal).diff(moment(dateInicial), 'days');

  return (
    <>
      <Grid container spacing={3} direction="row" className="mt-2">
        <Grid item xs={6} sm={4} md={3} width="auto">
          <Paper className="heightPaper1">
            <Grid container>
              <Grid xs={4} className="backgroundFase heightPaper1">
                <p className="titleCardIndicador ml-2 mt-4">Periodo:</p>
              </Grid>
              <Grid item xs >
                <Select
                  styles={customStyles}
                  options={options}
                  value={selectedOption}
                  formatOptionLabel={formatOptionLabel}
                  onChange={handleChange}
                  className="zindex"
                >
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={3} width="auto">
          <Paper className="heightPaper1">
            <Grid container>
              <Grid xs={4} className="backgroundFase heightPaper1">
                <p className="titleCardIndicador ml-2 mt-4">Fase:</p>
              </Grid>
              <Grid item xs>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className="mt-2 ml-0 ml-sm-1">
                  <Grid id={'icoCardFase-' + props.objectSelected.hito.fase.nombre}></Grid>
                  <Grid ><p className="subTitleCardIndicador ml-4 ml-sm-2 mt-3">{props.objectSelected.hito.fase.nombre}</p></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={6} width="auto">
          <Paper className="heightPaper1">
            <Grid container>
              <Grid item xs={2} className="backgroundFase heightPaper1">
                <p className="titleCardIndicador ml-3 mt-4">Hito:</p>
              </Grid>
              <Grid item xs className="ml-3"
              container
              direction = "row"
              justify = "center"
              alignItems = "center" >
                <p className="subTitleCardIndicador">{props.objectSelected.hito.nombre}</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {(() => {
        if (ejecucionValue === null) {
          return (

            <Grid container spacing={3} direction="row" alignItems="flex-end" className="mt-0">
              <Grid item xs={12} sm={6} width="auto" >
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  <Grid className="positionTextMilestone">
                    <Grid className="mt-4">
                      <span className="titleCardIndicador">Fecha planeada</span>
                      <br />
                      <span className="subTitleCardIndicador">{moment(new Date(props.objectSelected.fechaPlaneada)).format("DD/MM/YYYY")}</span>
                    </Grid>
                    <Grid>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  <Grid className="positionTextMilestone">
                    <Grid className="mt-4">
                      <span className="titleCardIndicador">Responsable</span>
                      <br />
                      <span className="subTitleCardIndicador">{props.objectSelected.responsable.nombres} {props.objectSelected.responsable.apellidos} </span>
                    </Grid>
                  </Grid>
                  <Grid>

                  </Grid>
                </Paper>
              </Grid>
            </Grid>


          )

        } else {
          return (

            <Grid container spacing={3} direction="row" alignItems="flex-end" className="mt-2">
              <Grid item xs={6} sm={3} width="auto">
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  <Grid className="positionTextMilestone">
                    <Grid className="mt-4">
                      <span className="titleCardIndicador">Fecha planeada</span>
                      <br />
                      <span className="subTitleCardIndicador">{moment(new Date(props.objectSelected.fechaPlaneada)).format("DD/MM/YYYY")}</span>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  {(() => {
                    if (days > 0) {
                      return (
                        <>
                          <div className='Atrasado'></div>
                          <Grid className="mt-2">
                            <span className='subTitleCardIndicador'>+ {days} días</span>
                          </Grid>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <div className='Terminado'></div>
                          <Grid className="mt-2">
                            <span className='subTitleCardIndicador'> {days} días </span>
                          </Grid>
                        </>
                      )
                    }
                  })()}


                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  <Grid className="positionTextMilestone">
                    <Grid className="mt-4">
                      <span className="titleCardIndicador">Fecha terminado</span>
                      <br />
                      <span className="subTitleCardIndicador">{moment(new Date(props.objectSelected.fechaEjecucion)).format("DD/MM/YYYY")}</span>
                    </Grid>
                    <Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper className={classes.paper} id="dataMilestoneContainer">
                  <Grid className="positionTextMilestone">
                    <Grid className="mt-4">
                      <span className="titleCardIndicador">Responsable</span>
                      <br />
                      <span className="subTitleCardIndicador">{props.objectSelected.responsable.nombres} {props.objectSelected.responsable.apellidos} </span>
                    </Grid>
                    <Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>


          )
        }

      })()}

    </>
  )

} 