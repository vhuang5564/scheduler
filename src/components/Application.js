import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  // {
  //   id: 1,
  //   time: "12pm",
  // },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Bob Ross",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Simba",
      interviewer: {
        id: 2,
        name: "Jafar",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "10pm",
    interview: {
      student: "Aladdin",
      interviewer: {
        id: 3,
        name: "Genie",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];



export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const appointmentList = appointments.map( appointment => {
    return (
      <Appointment
      key={appointment.id}
      // {...appointment}
      id={appointment.id}
      time={appointment.time}
      interview={[appointment.interview]}
      student={[appointment.interview.student]}
      // interview={appointment.interview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
