import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//odometer js
//import Odometer from 'react-odometerjs'
//import 'odometer/themes/odometer-theme-default.css';

//styles
import "../indicators/indicatorsComponent.scss"

//Graphs

import BarsComponent from "../barsComponent/barsComponent"
import DonutComponent from "../donut/donutComponent"
import * as locale from '../localeEsCo'





export default function useIndicators(props) {

  const [valueIndicatorAnt, setValueIndicatorAnt ] = useState(0)
 // const [valueIndicatorAct, setValueIndicatorAct ] = useState(0)
  var finalArray;
  var barColor;
  var formatValue = locale.locale_esCo.format(',');
  
  useEffect(() => {
    setValueIndicatorAnt(valueIndicatorAnt)
  }, []);

  return (

    <>
     
     {props.indicatorsSchema.length && props.dataAnt.length && props.dataAct.length && props.dataGrafica.length !== 0 ?

props.indicatorsSchema.map((row, index) => (
  
  row.indicador.hito.fase.nombre === "Difusión" ? barColor = '#FF3E7D'
    : row.indicador.hito.fase.nombre === "Análisis" ? barColor = '#5B29AD'
      : row.indicador.hito.fase.nombre === "Procesamiento" ? barColor = '#456E7B'
        : barColor = '#FF9550',

  <div key={`${row.indicador.indnombre} ${index}`}>
    <Paper className="mt-3">
      <Grid container>
        <Grid xs={12} lg={1} className="backgroundFase">
          <Grid id={"icoIndicator-" + row.indicador.hito.fase.nombre} className="mt-3"></Grid>
        </Grid>
        <Grid item xs={12} lg={4} className="mx-3 mt-4">
          <Grid container>
            <p className="titleInformacionIndicador">{row.indicador.indnombre}</p>


            <Grid container spacing={2}>
              {/*  dato anterior  */}
              <Grid item xs={12} lg={6}>
                
                 <p className="periodoInformacionIndicador">{props.dataAnt[index].hitoOE.periodo.periodo.nombre}</p>
                <p className="contenidoInformacionIndicador">{row.indicador.descripcion}</p>
               
                     <p className="cifraInformacionIndicador">
                      {/*<Odometer 
                        format='(.ddd),dd'
                        duration={500}
                        value={valueIndicatorAnt + props.dataAnt[index].valor}
                        /> */}
                      {formatValue(props.dataAnt[index].valor)} {row.indicador.sufijo}</p>   
                  
                
                
              </Grid>
              {/*  dato actual  */}
              <Grid item xs={12} lg={6}>
                 <p className="periodoInformacionIndicador">{props.dataAct[index].hitoOE.periodo.periodo.nombre}</p>
                <p className="contenidoInformacionIndicador">{row.indicador.descripcion}</p>
                
                    <p className="cifraInformacionIndicador">{formatValue(props.dataAct[index].valor)} {row.indicador.sufijo}</p>  
                 
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        {/* funcion para adecuar los datos para los graficos */}
          {
          finalArray = props.dataGrafica.map((el, i, self) => {
            const existences = self.filter(obj => obj.indicador.indnombre === el.indicador.indnombre);
            if (existences.length > 1) {
              const $el = Object.assign({}, el, {
                sourceGraph: existences.map(obj => ({
                  "indicador": obj.indicador.indnombre, "value": obj.valor,
                  "name": obj.hitoOE.periodo.periodo.nombre, "sufijo": obj.indicador.sufijo,
                  "color": "#DEDEDE",
                  "idGraph": index,
                }))
              });
              return $el;
            }
          }).filter((el, i, self) => el)
            .filter((el, i, self) => (
              self.findIndex($el => $el.indicador.indnombre === el.indicador.indnombre) === i
            )),
          console.log("sourcegRAPH", finalArray[index].sourceGraph)
        }
        <Grid item xs={12} lg={6} id="graphContainer">
          {row.indicador.grafica.nombre === "Barras" ? <div> <BarsComponent dataBars={finalArray[index].sourceGraph} color={barColor} /> </div>
            : row.indicador.grafica.nombre === "Dona" ? <div><DonutComponent data={finalArray[index].sourceGraph} color={barColor} /></div>
              : <h2>Lineas</h2>} 

        </Grid>   
      </Grid>
      {/* Background formule */}

      <Grid container className="background_information pt-2">
        <Grid xs={12} lg={1} >
          <Grid id="informationIcon"></Grid>
        </Grid>
        <Grid xs={12} lg={11} >
          <p className="mt-3"><i>{row.indicador.formula}</i></p>
        </Grid>
      </Grid>
    </Paper>
  </div>
)) : <Grid
  container
  direction="row"
  justify="center"
  alignItems="center">
    <h2 className="alertNoData">
        No hay información
    </h2>

</Grid> }
    
    </>
  )

}



