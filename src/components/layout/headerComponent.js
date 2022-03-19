import React from 'react';
import Helmet from 'react-helmet';


//material-ui
import Grid from '@material-ui/core/Grid';


// styles
import '../layout/headerComponent.scss'

const HeaderComponent = () => {
  return (
    <Grid>
      <Helmet title="Oraculus" link={[{ rel: 'shortcut icon', href: "http://www.dane.gov.co/templates/t3_bs3_blank/favicon.ico" }]} />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <Grid container
        direction="row"
        alignItems="center"
        id="container_title"
        >
        <Grid item xs={3}
          className="title">
          <h2>
            ORACULUS
              </h2>
        </Grid>
        <Grid item xs={6} className="line">
          <h3 className="title_2">
            Sistema de monitoreo al 
            <br></br>
            desempeño y calidad del proceso estadístico
          </h3>
        </Grid> 
        <Grid item xs={3}
        container
        direction="row"
        justify="flex-end"
        >
          <img src="https://www.dane.gov.co/templates/t3_bs3_blank/images/logo-Gobierno-Colombia.png" alt="Logo presidencia"/>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default HeaderComponent