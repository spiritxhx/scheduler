import { useEffect, useReducer } from 'react';
// import WebSocket from 'ws';
import axios from 'axios';
import { getDayFromAppointmentId, getSpotsForDay } from '../helpers/selectors';
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//set up the websocket
const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const reducer = (state, action) => {
  const { day, days, appointments, interviewers, id, interview } = action;
  switch (action.type) {
    case SET_DAY:
      return { ...state, day };

    case SET_APPLICATION_DATA:
      return {
        ...state, days, appointments, interviewers
      };

    case SET_INTERVIEW: {
      const dayObj = state.days.find(eachDay => eachDay.name === day);
      const dayIndex = dayObj.id - 1;
      const appointment = {
        ...state.appointments[id],
        interview: interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      dayObj.spots = getSpotsForDay(appointments, day);
      const days = state.days;
      days[dayIndex] = dayObj;
      return {
        ...state,
        appointments: { ...appointments },
        days
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      appointments: {}
    });
  const setDay = day => dispatch({ type: SET_DAY, day });

  const getDays = axios.get("http://localhost:3001/api/days");
  const getAppointments = axios.get("http://localhost:3001/api/appointments");
  const getInterviewers = axios.get("http://localhost:3001/api/interviewers");

  useEffect(() => {
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(res => {
        dispatch(({
          type: SET_APPLICATION_DATA,
          ...state,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        }))
      })
      .catch(err => console.log(err))
  }, []);

  //deal with the websocket to dynamically render multiple pages
  ws.onmessage = function (event) {
    const { type, id, interview } = JSON.parse(event.data);
    const day = getDayFromAppointmentId(id);
    dispatch({ type, id, interview, day: day });
  }

  const bookInterview = (id, interview, day) => {
    //put the update into the server side and database
    return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview, day });
      })
  }

  const cancelInterview = (id, day) => {
    return axios.delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null, day })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}