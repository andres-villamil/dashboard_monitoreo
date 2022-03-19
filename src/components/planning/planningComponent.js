import React from 'react';
import { Link } from 'gatsby'

import moment from 'moment'


/* styles */
import '../planning/planningComponent.scss'



export default function usePlanning(props) {

  

        const convertFormatDate = e => Object.assign({}, e, {
            fechaPlaneada:  new Date(e.fechaPlaneada).setMinutes(new Date(e.fechaPlaneada).getMinutes()+new Date(e.fechaPlaneada).getTimezoneOffset()),
            fechaEjecucion:   new Date(e.fechaEjecucion).setMinutes(new Date(e.fechaPlaneada).getMinutes()+new Date(e.fechaPlaneada).getTimezoneOffset() ),
          });
        
        console.log("planning __________recibiendo", props.planningSchema)
        //  split query Date
       
        var monthQuery
        var dateQuery = []
        var yearQuery
        var dataPlanning = props.planningSchema.map(convertFormatDate)
         //  split current Date
        var currentDateArray = []
        var selectedMonth
        var selectedYear
      



        return(
        <>
        { props.templateView === "home" ?  
          
          dataPlanning.sort((a,b) =>{ 
             return new Date(a.fechaPlaneada) - new Date(b.fechaPlaneada)
            })
          .filter((item) => (
            dateQuery = moment(new Date(item.fechaPlaneada)).format("DD/MM/YYYY").split('/'),
            monthQuery = dateQuery[1], 
            yearQuery = dateQuery[2],
            currentDateArray = props.homePeriodo.split('/'),
            selectedMonth = currentDateArray[1],
            selectedYear = currentDateArray[2],
            selectedMonth ===  monthQuery && selectedYear === yearQuery 
          )).map((row, i) => (

            <div key={`${row.fechaPlaneada} ${i}`} >  
              <div className={"allElements mt-1 mb-1 "+row.hito.abreviacionHito} >
                <div className="date"><p>{moment(new Date(row.fechaPlaneada)).format("DD/MM/YYYY")}</p></div>
                  <div className="description mui-container ">
                      <div className="mui-row">
                          <div className={"mui-col-xs-11 Color"+row.hito.fase.nombre}>
                            <Link className="linkFase" to={`/${row.periodo.operacionEstadistica.abreviacion}/${row.periodo.periodo.nombre}/${row.hito.abreviacionHito}`} >   
                            <p className="ml-1 mr-1" >{row.hito.nombre} {row.periodo.nombre} Fecha planeada {moment(new Date(row.fechaPlaneada)).format("DD/MM/YYYY")}</p>
                            </Link>
                          </div>
                          <div className="mui-col-xs-1" id={row.estado.nombre.replace(/ /g,"")+"State"}></div>
                    </div>
                </div>
              </div>  
            </div>


          ))
          
        
        : dataPlanning.map((row, i) => (
          
        <div key={`${row.fechaPlaneada} ${i}`} >  
         <div className={"allElements mt-1 mb-1 "+row.hito.abreviacionHito} >
                <div className="date"><p>{moment(new Date(row.fechaPlaneada)).format("DD/MM/YYYY")}</p></div>
                <div className="description mui-container ">
                      <div className="mui-row">
                          <div className={"mui-col-xs-11 Color"+row.hito.fase.nombre}>
                            <Link className="linkFase" to={`/${row.periodo.operacionEstadistica.abreviacion}/${row.periodo.periodo.nombre}/${row.hito.abreviacionHito}`} >   
                            <p className="ml-1 mr-1" >{row.hito.nombre} {row.periodo.nombre} Fecha planeada {moment(new Date(row.fechaPlaneada)).format("DD/MM/YYYY")}</p>
                            </Link>
                          </div>
                          <div className="mui-col-xs-1" id={row.estado.nombre.replace(/ /g,"")+"State"}></div>
                    </div>
                </div>
          </div>  
        </div>
        ))}
        </>
        )
     
}   