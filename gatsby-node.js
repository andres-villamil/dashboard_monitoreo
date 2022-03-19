/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});

exports.createPages = async ({ actions, graphql, getNode }) => {
  const { createPage } = actions;

  const getMilestone = makeRequest(graphql, `
    {
      getCourse {
        ora_HitoOes {
          id
          fechaPlaneada
          fechaEjecucion
          periodo {
            nombre
            operacionEstadistica{
              abreviacion
              nombre
            }
            periodo {
              nombre
              codigo
            }
          }
          hito {
            nombre
            abreviacionHito
            fase {
              nombre
            }
            indicador{
              indnombre
            }
          }
          responsable{
            nombres
            apellidos
          }
          
        }
        
      }
    }
    `).then(result => {
    // Create pages for each milestone.
    result.data.getCourse.ora_HitoOes.forEach(({  periodo, hito }) => {
      const codigoAnt = periodo.periodo.codigo - 1   
      createPage({
        path: `/${periodo.operacionEstadistica.abreviacion}/${periodo.periodo.nombre}/${hito.abreviacionHito}`,
        component: path.resolve(`src/components/milestonePages/templateMilestone.js`),
        context: {
          periodo:periodo.periodo.nombre,
          hito:hito.abreviacionHito,
          operacionEst: periodo.operacionEstadistica.nombre, 
          abreviacionOE: periodo.operacionEstadistica.abreviacion,
          codigo: periodo.periodo.codigo,
          codigoAnt: codigoAnt,
          
        
        },
      }) 
    })
  });


  const getOperation = makeRequest(graphql, `
  {
    getCourse {
      ora_HitoOes {
        id
        fechaPlaneada
        fechaEjecucion
        periodo {
          nombre
          operacionEstadistica{
            abreviacion
            nombre
          }
          periodo {
            nombre
            codigo
          }
        }
        hito {
          nombre
          abreviacionHito
          fase {
            nombre
          }
          indicador{
            indnombre
          }
        }
        responsable{
          nombres
          apellidos
        }
        
      }
      
    }
  }
  `).then(result => {
  // Create pages for each statisticas Operation.
  result.data.getCourse.ora_HitoOes.forEach(({  periodo, hito }) => {
    const codigoAnt = periodo.periodo.codigo - 1 
    const PublicationHito =  "publicacion"
    const keyIndicatorPrincipal = 3
    createPage({
      path: `/${periodo.operacionEstadistica.abreviacion}/${periodo.periodo.nombre}`,
      component: path.resolve(`src/components/operationStatPages/templateOperation.js`),
      context: {
        periodo:periodo.periodo.nombre,
        hito:hito.abreviacionHito,
        operacionEst: periodo.operacionEstadistica.nombre, 
        abreviacionOE: periodo.operacionEstadistica.abreviacion,
        codigo: periodo.periodo.codigo,
        codigoAnt: codigoAnt,
        PublicationHito:  PublicationHito,
        keyIndicatorPrincipal: keyIndicatorPrincipal, 

      },
    }) 
  })
});


  // Queries for contents to use in creating pages.
  return Promise.all([
    getMilestone,
    getOperation,
    
  ])
};