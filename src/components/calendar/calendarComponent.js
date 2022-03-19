import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// load styles 
import '../calendar/calendar.scss'

require('moment/locale/es.js');

//moment.locale('es');
const localizer = momentLocalizer(moment);

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
}


const convertFormatDate = e => Object.assign({}, e, {
  fechaPlaneada: new Date(e.fechaPlaneada).setMinutes(new Date(e.fechaPlaneada).getMinutes() + new Date(e.fechaPlaneada).getTimezoneOffset()),
  fechaEjecucion: new Date(e.fechaEjecucion).setMinutes(new Date(e.fechaPlaneada).getMinutes() + new Date(e.fechaPlaneada).getTimezoneOffset()),
});


function eventStyleGetter(event, start, end, isSelected) {
  var backgroundColor;
  if (event.hito.fase.nombre === "Difusión") {
    backgroundColor = '#FF3E7D';
  }
  if (event.hito.fase.nombre === "Análisis") {
    backgroundColor = '#5B29AD';
  }
  if (event.hito.fase.nombre === "Procesamiento") {
    backgroundColor = '#456E7B';
  }
  if (event.hito.fase.nombre === "Recoleccion") {
    backgroundColor = '#FF9550';
  }
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block'
  };
  return {
    style: style
  };
}




class CustomToolbar extends React.Component {

  render() {
    let { localizer: { messages }, label } = this.props
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            {"<"}
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>
            {">"}
          </button>
        </span>
      </div>
    )
  }
  navigate = action => {
    this.props.onNavigate(action)
  }

}

const CalendarComponent = props => (
  <div>
    <Calendar
      localizer={localizer}
      style={{ height: 310}}
      step={60}
      events={props.calendarSchema.map(convertFormatDate)}
      startAccessor="fechaPlaneada"
      endAccessor="fechaPlaneada"
      defaultDate={props.defaultDate}
      views={['month']}
      eventPropGetter={(eventStyleGetter)}
      onNavigate={event => { console.log( "periodo referencia string", moment(new Date(event)).format("DD/MM/YYYY")); props.onChangePeridoDefault(moment(new Date(event)).format("DD/MM/YYYY")) }}
      components={{
        toolbar: CustomToolbar
      }}
    />
  </div>

)




export default CalendarComponent;










