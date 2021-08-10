import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) { 
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()

  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const appointmentList = dailyAppointments.map(appointment => {
    const interviewForAppointment = getInterview(state, appointment.interview)
    return ( 
      <Appointment 
      key={appointment.id}
      {...appointment}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      interviewer={
      interviewForAppointment ? interviewForAppointment.interviewer : null}
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
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
