import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day });
  let dailyAppointments = [];
  let dailyInterviewers = [];

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data}))
    })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day)
  dailyInterviewers = getInterviewersForDay(state, state.day)

  console.log(dailyInterviewers)
  
  const appointmentList = dailyAppointments.map(appointment => {

    return ( 
      <Appointment 
      key={appointment.id}
      {...appointment}
      interviewers={dailyInterviewers}
      />
    )
  })

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

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
          days={state.days}
          day={state.day}
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
