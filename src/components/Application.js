import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import "components/Application.scss";
import DayList from 'components/DayList';
import axios from 'axios';

// eslint-disable-next-line

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => {
    setState(prev => ({ ...prev, appointments }))
  }
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

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

  const deleteInterview = id => {
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
  //show the correct value for appoinments
  const interviewers = getInterviewersForDay(state, state.day);
  const days = getAppointmentsForDay(state, state.day);
  const appointmentList = days.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
    />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setDay(day)}
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
