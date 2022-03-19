import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//styles
import "../indicators/indicatorsComponent.scss"

//Graphs

import BarsComponent from "../barsComponent/barsComponent"
import DonutComponent from "../donut/donutComponent"
import * as locale from '../localeEsCo'

export default function useIndicators(props) {

  var finalArray;
  var color;
  var formatValue = locale.locale_esCo.format(',');
  return (

    <>

      {props.principalIndicators.length && props.dataAnt.length && props.dataAct.length && props.dataGrafica.length !== 0 ?

        props.principalIndicators.map((row, index) => (

          row.hitoOE.hito.fase.nombre === "Difusión" ? color = '#FF3E7D'
            : row.hitoOE.hito.fase.nombre === "Análisis" ? color = '#5B29AD'
              : row.hitoOE.hito.fase.nombre === "Procesamiento" ? color = '#456E7B'
                : color = '#FF9550',

          <div key={`${row.indicador.indnombre} ${index}`} >
            {console.log("rows", row)}
            <Paper className="mt-3">
              <Grid container>
                <Grid xs={12} lg={1} className="backgroundFase">
                  <Grid id={"icoIndicator-" + row.hitoOE.hito.fase.nombre} className="mt-3"></Grid>
                </Grid>
                <Grid item xs={12} lg={4} className="ml-3 mt-4">
                  <Grid container>
                    <p className="titleInformacionIndicador">{row.indicador.indnombre}</p>
                    <Grid container spacing={2}>
                      {/*  dato anterior  */}
                      <Grid item xs={12} lg={6}>
                        {console.log("verificacion datos anteriores", props.dataAnt)}

                        <p className="periodoInformacionIndicador">{props.dataAnt[index].hitoOE.periodo.periodo.nombre}</p>
                        <p className="contenidoInformacionIndicador">{row.indicador.descripcion}</p>
                        <p className="cifraInformacionIndicador">{formatValue(props.dataAnt[index].valor)} {row.indicador.sufijo} </p>
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
                  {row.indicador.grafica.nombre === "Barras" ? <div> <BarsComponent dataBars={finalArray[index].sourceGraph} color={color} /> </div>
                    : row.indicador.grafica.nombre === "Dona" ? <div><DonutComponent data={finalArray[index].sourceGraph} color={color} /></div>
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
        )) : <h2>No hay información</h2>}

    </>
  )

}




