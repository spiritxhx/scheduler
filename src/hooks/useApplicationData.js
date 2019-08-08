import { useState,useEffect } from 'react';
import axios from 'axios';

export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const getDays = axios.get("http://localhost:3001/api/days");
  const getAppointments = axios.get("http://localhost:3001/api/appointments");
  const getInterviewers = axios.get("http://localhost:3001/api/interviewers");

  useEffect(() => {
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(res => {
        setState(prev => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        }))
      })
      .catch(err => console.log(err))
  }, []);
  const setDay = day => {
    setState(prev => ({ ...prev, day }))
  }

  const bookInterview = (id, interview) => {
    //put the update into the server side and database
    return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments: { ...appointments }
        });
      })
  }

  const cancelInterview = id => {
    return axios.delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments: { ...appointments }
        });
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}