import { useStaticQuery, graphql } from "gatsby"

export const useBaseQuery = () => {
    const querydata = useStaticQuery(graphql`
    query ReporterQuery{
  getCourse {
    hitos:  ora_HitoOes {
      fechaPlaneada
    fechaEjecucion
      hito {
        abreviacionHito
        nombre
        fase {
          nombre

        }
        dependencia{
          depnombre
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
    SelectorOE: ora_OpEstadisticas{
      value: abreviacion
      label: nombre
    }
    SelectorDependencias: ora_Dependencias{
      value: depnombre
      label: depnombre
    }
  }
}
`)
  return querydata
}