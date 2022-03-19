import React, { useState } from 'react';
import { Link } from 'gatsby'
import { useBaseQuery } from '../models/use-base-query';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import moment from 'moment'

// styles
import 'normalize.css'
import '../components/layout/_index.scss'

// ----- layout components ----------- //

import HeaderComponent from "../components/layout/headerComponent"


// ----- load components ----------- //

import SelectLegendComponent from "../components/selectLegend/selectLegendComponent"
import CalendarComponent from "../components/calendar/calendarComponent"
import PlanningComponent from "../components/planning/planningComponent"
import SelectOperationComponent from "../components/selectOperation/selectOperationComponent"
import SelectDependenceComponent from "../components/selectDependence/selectDependenceComponent"
import TablePhaseComponent from "../components/tablePhase/tablePhaseComponent"
import { Hidden } from '@material-ui/core';



// styles
//import '../pages/views/scss/_index.scss'


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

    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        overflowX: 'hidden !important',
    },

    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    toolbar: theme.mixins.toolbar,

    drawerPaper: {
        width: drawerWidth,
    },

    content: {
        marginTop: 120,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));



export default function Home() {

    const data = useBaseQuery()
    console.log("toda la data", data)

    const homeData = data.getCourse.hitos.map((el, i, self) => {
        const existences = self.filter(obj => obj.periodo.periodo.nombre === el.periodo.periodo.nombre);
        if (existences.length > 1) {
            const $el = Object.assign({}, el, {
                sourceHome: existences.map(obj => ({
                    "periodoRef": obj.periodo.periodo.nombre,
                    "fechaPlaneada": obj.fechaPlaneada,
                    "fechaEjecucion": obj.fechaEjecucion,
                    "fase": obj.hito.fase.nombre,
                    "hito": obj.hito,
                    "periodo": obj.periodo,
                    "estado": obj.estado
                }))
            });
            return $el;
        }
    }).filter((el, i, self) => el)
        .filter((el, i, self) => (
            self.findIndex($el => $el.periodo.periodo.nombre === el.periodo.periodo.nombre) === i
        ));

    console.log("home data planning", homeData)

    const defaultDateCalendar = new Date()
    const [periodoDefault, setPeriodoDefault] = useState(moment(new Date()).format("DD/MM/YYYY"))
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("DD/MM/YYYY"))
    const [selectOperation] = useState(null)
    const [selectDependence] = useState(null)
    const [currentOperation, setCurrentOperation] = useState(null)
    const [currentDependence, setCurrentDependence] = useState(null)
    const typeTemplate = "home"

    console.log("tipo de texto", typeof ("08"), typeof (8))

    //state test

    //console.log("periodo default cambio", periodoDefault.replace(/^0+/, '') - 1)
    //console.log("periodos de referencia home", homeData[periodoDefault.replace(/^0+/, '') - 1].sourceHome)
    console.log("hoy", selectedDate)

    const classes = useStyles();

    return (
        <div className={classes.root} id="home">
            <CssBaseline />


            <AppBar className={classes.appBar} position="fixed" color="inherit" >
                <HeaderComponent />
            </AppBar>
            <div className="drawer">
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">                    
                    <Link to={"/"} id="container_logo">
                        <img src="" alt="Logo" className="logo"></img>
                    </Link>
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
                        <Grid className="mb-2" ></Grid>
                        <Divider />
                        <CalendarComponent defaultDate={defaultDateCalendar} homePeriodo={periodoDefault} onChangePeridoDefault={(periodoDefault) => setPeriodoDefault(periodoDefault)} calendarSchema={data.getCourse.hitos} currentDate={selectedDate} onChangeDate={(selectedDate) => setSelectedDate(selectedDate)} />

                        <Divider />
                        <Grid className="mt-2" ></Grid>

                        <PlanningComponent templateView={typeTemplate} homePeriodo={periodoDefault} onChangePeridoDefault={(periodoDefault) => setPeriodoDefault(periodoDefault)} planningSchema={data.getCourse.hitos} currentDate={selectedDate} />

                        <br />
                    </List>
                </Drawer>
            </div>
            <main className={classes.content} id="containerMaintesting">

                <Paper >
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        id="title_component">
                        <span id="icoTitle"></span>
                        <h2>Próximos hitos a cumplirse</h2>
                    </Grid>
                </Paper>
                <Paper className="container_select">
                    <Grid container spacing={3} direction="row" alignItems="flex-end">
                        <Grid item xs={12} sm={6} container justify="center" className="select_position-1">
                            <Grid id="selectComponent">
                                <SelectOperationComponent oeSchema={data.getCourse.SelectorOE} selectData={selectOperation} onChangeOperation={(currentOperation) => setCurrentOperation(currentOperation)} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container justify="center" className="select_position-1" >
                            <Grid id="selectComponent">
                                <SelectDependenceComponent dependenciasSchema={data.getCourse.SelectorDependencias} selectData={selectDependence} onChangeDependence={(currentDependence) => setCurrentDependence(currentDependence)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className="mt-2">

                    <TablePhaseComponent tableSchema={data.getCourse.hitos} currentDate={selectedDate} operationValue={currentOperation} dependenceValue={currentDependence} />

                </Paper>




            </main>

        </div>
    );




}

