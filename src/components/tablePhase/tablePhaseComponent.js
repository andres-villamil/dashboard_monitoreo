import React from 'react';
import moment from 'moment'
import localization from 'moment/locale/es'
import { Link } from 'gatsby'
//styles table
import '../tablePhase/tablePhaseComponent.scss'
import { Grid } from '@material-ui/core';

export default function useTablePhase(props) {

        const convertFormatDate = e => Object.assign({}, e, {
            fechaPlaneada: new Date(e.fechaPlaneada).setMinutes(new Date(e.fechaPlaneada).getMinutes() + new Date(e.fechaPlaneada).getTimezoneOffset()),
            fechaEjecucion: new Date(e.fechaEjecucion).setMinutes(new Date(e.fechaPlaneada).getMinutes() + new Date(e.fechaPlaneada).getTimezoneOffset()),
        });
        var tableData =  props.tableSchema.map(convertFormatDate);

    return ( 
        <div> 
            <table>
                <thead>
                    <tr>
                            <th>Fecha Planeada</th>
                            <th>Hito</th>
                            <th>Operación estadística</th>
                            <th>Responsable</th>
                            <th>Fase</th>
                    </tr>
                </thead>
                <tbody>
            {
              tableData.filter((item) => (
                (props.operationValue === null && props.dependenceValue === null) ?
                    (item.estado.nombre === "En Proceso" || item.estado.nombre === "Atrasado")
                        : (props.operationValue === null) ?
                            ((item.hito.dependencia.depnombre === props.dependenceValue) && (item.estado.nombre === "En Proceso" || item.estado.nombre === "Atrasado" ))
                        : (props.dependenceValue === null) ?
                            ((item.periodo.operacionEstadistica.abreviacion === props.operationValue) && (item.estado.nombre === "En Proceso" || item.estado.nombre === "Atrasado" ))
                        : ((item.periodo.operacionEstadistica.abreviacion === props.operationValue) && (item.hito.dependencia.depnombre === props.dependenceValue) && (item.estado.nombre === "En Proceso" || item.estado.nombre === "Atrasado"))
                     
             )).map((item, i) =>(
                
                  
                <tr key={`${item.estado.nombre}${i}`}>
                    <td id={item.estado.nombre}>{moment(new Date(item.fechaPlaneada)).locale("es", localization).format("LL")}</td>
                    <td className="referentLink"><Link  to={`/${item.periodo.operacionEstadistica.abreviacion}/${item.periodo.periodo.nombre}/${item.hito.abreviacionHito}`}>{item.hito.nombre}</Link></td>
                    <td className="referentLink"><Link to={`/${item.periodo.operacionEstadistica.abreviacion}/${item.periodo.periodo.nombre}`} >{item.periodo.nombre}</Link></td>
                    <td>{item.responsable.nombres} {item.responsable.apellidos}</td>
                    <td className={item.hito.fase.nombre}>
                        <Grid container>
                            <Grid item id={item.hito.fase.nombre}></Grid>
                            <Grid item className="ml-3" >
                                 {item.hito.fase.nombre}
                            </Grid>
                        </Grid>
                    </td>
                </tr> 
               

             ))
            } 

            </tbody>
        </table>    
        </div>    
    )
}