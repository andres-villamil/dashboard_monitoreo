import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InfoIcon from '@material-ui/icons/Info';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

// styles
import '../selectLegend/selectLegend.scss'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Identificador de FASES" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={1} className="mt-1">
          <Grid item xs={6}>
            <List component="div" disablePadding className="recoleccion">
              <ListItem >
                <ListItemText primary="Recolección" className="position_text-1" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component="div" disablePadding className="procesamiento">
              <ListItem >
                <ListItemText primary="Procesamiento" className="position_text-1" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component="div" disablePadding className="analisis">
              <ListItem >
                <ListItemText primary="Análisis" className="position_text-1" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component="div" disablePadding className="difusion">
              <ListItem >
                <ListItemText primary="Difusión" className="position_text-1" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Collapse>
    </List>
  );
}


