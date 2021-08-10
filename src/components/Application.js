import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

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
  
  
  const appointmentList = dailyAppointments.map(appointment => {
    const interviewForAppointment = getInterview(state, appointment.interview)
    return ( 
      <Appointment 
      key={appointment.id}
      {...appointment}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      interviewer={
      interviewForAppointment ? 
      interviewForAppointment.interviewer :
      null}
      />
    )
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ // use this formula to set appointments to null
      ...state,
      appointments
    });

    const test = {title: 'example'}
    
    axios.put(`http://localhost:8001/api/appointments/${id}`, test)
    .then((res) => {
      console.log(res);
    })
  }

  function cancelInterview(id) {
    setState(
      // state.appointments[id].interview,
      state.appointments[2].interview,
      null
    )
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
