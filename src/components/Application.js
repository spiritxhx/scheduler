import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index';

import "components/Application.scss";
import DayList from 'components/DayList';
import axios from 'axios';

// eslint-disable-next-line
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"

  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Bob",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: "last",
    time: "4pm",
  }


];
export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/days")
      .then(res => {
        setDays(res.data);
      })
      .catch(err => console.log(err))
  }, []
  );
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <DayList
          days={days}
          day={day}
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
        {appointments.map(appointment => {
          return <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}
          />;
        })}
      </section>
    </main>
  );
}
