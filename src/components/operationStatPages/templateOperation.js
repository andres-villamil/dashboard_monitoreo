import React, { useState } from 'react';
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import 'normalize.css'
import moment from 'moment'

// ----- layout components ----------- //

import HeaderComponent from "../layout/headerComponent"
import TitleSelectorComponent from "../layout/titleSelectorComponent"


// ----- load components ----------- //

import SelectLegendComponent from "../selectLegend/selectLegendComponent"
import CalendarComponent from "../calendar/calendarComponent"
import PlanningComponent from "../planning/planningComponent"
import DatePublication from "../layout/datePublicationComponent"
import PrincipalIndicators from '../principalIndicators/principalIndicators'


const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    display: 'flex',
  },
  appBar: {

    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: 120,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));



export default function statisticalOperation({ data, pageContext }) {

  // states 

  console.log("pageContext______________", pageContext)
  console.log("datagrafica", data.getCourse.ora_IndicadorHitoOes)
  const [titleMilestone, setTitleMilestone] = useState(data.getCourse.infoHito[0])
  const defaultDateCalendar = new Date(data.getCourse.infoHito[0].fechaPlaneada)
  const [periodoDefault, setPeriodoDefault] = useState(moment(new Date()).format("MM"))
  const typeViewTemplate = "statisticalOperation"
  const typeTemplate = "pages"

  // end states

  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("DD/MM/YYYY"))

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar className={classes.appBar} position="fixed" color="inherit" >
        <HeaderComponent />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <Grid item
          container
          direction="row"
          justify="center"
          alignItems="center"
          id="container_logo">
        <Link to={"/"}>
          <img  src="https://www.dane.gov.co/templates/t3_bs3_blank/images/logo-DANE.png" alt="Logo" className="logoDane"></img>
        </Link>
        </Grid>
        <Divider />
        <Grid id="titleCalendar"
          container
          direction="row"
          justify="center"
          alignItems="center">
          <h3>Hitos OOEE</h3>
        </Grid>
        <Grid>
          <SelectLegendComponent />
        </Grid>
        <List>
          <CalendarComponent defaultDate={defaultDateCalendar}  homePeriodo={periodoDefault} onChangePeridoDefault={(periodoDefault) => setPeriodoDefault(periodoDefault)}   calendarSchema={data.getCourse.hitos} currentDate={selectedDate} onChangeDate={(selectedDate) => setSelectedDate(selectedDate)} />
          <Divider />
          <Grid className="mt-2" ></Grid>
          <PlanningComponent templateView={typeTemplate} planningSchema={data.getCourse.hitos} currentDate={selectedDate}  />
          <br />
        </List>
      </Drawer>

      <main className={classes.content}>
         <TitleSelectorComponent  typeLink={typeViewTemplate}  objectSelected={titleMilestone} selectorOESchema={data.getCourse.SelectorOE} oeDefault={pageContext.operacionEst} oeAbrevDefault={pageContext.abreviacionOE} /> 
        <br />

        {/* date milestones */}
         <DatePublication PublicationData={data.getCourse.publication}  nextHito={data.getCourse.hitos} selectorPeriodoSchema={data.getCourse.SelectorHito} periodoDefault={pageContext.periodo}  objectSelected={titleMilestone}  onChangeTitleMilestone={(titleMilestone) => setTitleMilestone(titleMilestone)} />

        {/* Background indicator */}
        <PrincipalIndicators  principalIndicators={data.getCourse.indicadoresPrincipales}  dataGrafica={data.getCourse.ora_IndicadorHitoOes} dataAct={data.getCourse.fechaACt} dataAnt={data.getCourse.fechaAnt} /> 


      </main>
    </div>
  );
}

export const query = graphql`
  query OperationTemplate($periodo: String!, $hito: String!,  $codigo: Int!, $codigoAnt: Int!, $abreviacionOE: String!,  $PublicationHito: String!, $keyIndicatorPrincipal: Int!) {
  getCourse {
    hitos:  ora_HitoOes(
      where: {
        periodo:{
          operacionEstadistica:{
            abreviacion: $abreviacionOE
          }
           periodo:{
            nombre: $periodo
          }
        }
      }){  
      fechaPlaneada
      fechaEjecucion
      hito {
        abreviacionHito
        nombre
        fase {
          nombre
        }
        indicador{
          indnombre
        }  
        nombre
      }
      estado {
        nombre
      }
      periodo{
        nombre
        operacionEstadistica{
          abreviacion
          nombre
        }
        periodo{
          nombre
        }
      }
      responsable{
            nombres
            apellidos
          }        
    }
    
    publication: ora_HitoOes(
            orderBy: fechaPlaneada_ASC
                where: {  
                periodo:{
                  operacionEstadistica:{
                      abreviacion: $abreviacionOE
                  }
                   periodo:{
                       codigo: $codigo               
                    }
                }
                hito:{
                abreviacionHito: $PublicationHito
                                }
                            }
                  )
            {
              fechaPlaneada
           
           
            }

Hitopage: ora_IndicadorHitoOes(
  where:{
    hitoOE:{
      hito:{
            abreviacionHito: $hito
      }
      periodo:{
        operacionEstadistica:{
            abreviacion: $abreviacionOE
        }
        periodo:{
           nombre: $periodo
        }      
      }
    }
  })
  {
  valor
  indicador{
    indnombre
    formula
    sufijo
    descripcion
    grafica{
      nombre
    }
    hito{
      fase{
        nombre
      }
    }
   
  }
  hitoOE{
    fechaPlaneada
    fechaEjecucion
    responsable{
      nombres
      apellidos
    }
    estado{
      nombre
    }
    periodo{
     nombre
    operacionEstadistica{
      abreviacion
      nombre
    }
      periodo{
        nombre
        codigo
      }
      }
    hito{
      nombre
      abreviacionHito
      fase{
        nombre
      }
      dependencia{
        depnombre
      }      
     }
    }
   }             
  

ora_IndicadorHitoOes(
  where:{
    hitoOE:{
      periodo:{
        operacionEstadistica:{
          abreviacion: $abreviacionOE
        }
        periodo:{
          codigo_lte: $codigo
        } 
      }
    }
    indicador:{
      orden_lte: $keyIndicatorPrincipal
    }
  }
)
{
  valor
  indicador{
    indnombre
    formula
    sufijo
    grafica{
      nombre
    }
  }
  hitoOE{
    fechaPlaneada
    fechaEjecucion
    periodo{
      nombre
      periodo{
        nombre
      }
    }
     hito{
      indicador{
        grafica{
          nombre
        }
      } 
    }
  }
}

indicadoresPrincipales:ora_IndicadorHitoOes(
  where:{
    hitoOE:{
      periodo:{
        operacionEstadistica:{
          abreviacion: $abreviacionOE
        }
        periodo:{
          codigo: $codigo
        }         
      }      
    }
    indicador:{
      orden_lte:  $keyIndicatorPrincipal
     
    }
  }
)
{
  valor
  indicador{
    indnombre
    formula
    sufijo
    descripcion
    grafica{
      nombre
    }
  }
  hitoOE{
    fechaPlaneada
    fechaEjecucion
    hito{
      nombre
      fase{
        nombre
      }
    }
    
    periodo{
      nombre
    }
  }
}

infoHito: ora_HitoOes(
     orderBy: fechaPlaneada_ASC
        where: {
          periodo:{
            operacionEstadistica:{
              abreviacion: $abreviacionOE
            }
            periodo:{
              nombre: $periodo           
            }
          }
          hito:{
            abreviacionHito: $hito
          }
        }
)
  {
    fechaPlaneada
    fechaEjecucion
    responsable{
      nombres
      apellidos
    }
    estado{
      nombre
    }
    periodo{              
      nombre          
      operacionEstadistica{
        abreviacion
        nombre
      }
      periodo{
        nombre
        codigo        
      }    
    }
    hito{
      nombre
      abreviacionHito
      fase{
        nombre
      }
      dependencia{
        depnombre
      }
    }
  }



fechaACt:ora_IndicadorHitoOes(
  where:{
    hitoOE:{
    periodo:{
      operacionEstadistica:{
        abreviacion: $abreviacionOE
      }
      periodo:{
        codigo: $codigo
      }      
    }
  }
    indicador:{
      orden_lte: $keyIndicatorPrincipal
     
    }
}
)
{
  valor
  indicador{
    indnombre
  }
  hitoOE{
    fechaPlaneada
    fechaEjecucion
    periodo{
      nombre
      periodo{
        nombre
      }
    }
  }
}

fechaAnt:ora_IndicadorHitoOes(
  where:{
    hitoOE:{
    periodo:{
      operacionEstadistica:{
        abreviacion: $abreviacionOE
      }
      periodo:{
        codigo: $codigoAnt
      }      
    }
  }
    indicador:{
      orden_lte: $keyIndicatorPrincipal
     
    }
}
)
{
  valor
  indicador{
    indnombre
  }
  hitoOE{
    fechaPlaneada
    fechaEjecucion
    periodo{
      nombre
      periodo{
        nombre
      }
    }
  }
}

  SelectorHito: ora_IndicadorHitoOes(
  where:{
    hitoOE:{
      periodo:{
        operacionEstadistica:{
          abreviacion: $abreviacionOE
        }       
      }
    }
  }
)
{
  hitoOE{
    periodo{
      periodo{
        value: nombre
        label: nombre
      }
    }
  }
}

SelectorOE: ora_OpEstadisticas{
      value: abreviacion
      label: nombre
      periodicidad{
        periodicidad: nombre
      }
      periodo{
        periodo{
        periodo : nombre
        }
      }
   }

}

}
`


