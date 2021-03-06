import React from "react";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";

import "components/Application.scss";
import DayList from "components/DayList";
import { useApplicationData } from "hooks/useApplicationData";

// eslint-disable-next-line

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //show the correct value for appoinments
  const interviewers = getInterviewersForDay(state, state.day);
  const days = getAppointmentsForDay(state, state.day);
  // map through the days array to render the appointments
  const appointmentList = days.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        day={state.day}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // render the Daylist on the left
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
