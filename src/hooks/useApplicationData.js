import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day }); 

  const updateSpots = (dayName, days, appointments) => {
    const dayObj = days.find(day => day.name === dayName)
    let spots = 0;
  
    for (const id of dayObj.appointments) {
      const appointment = appointments[id]
      if(!appointment.interview) {
        spots++
      }
    }
  
    const newDay = {...dayObj, spots: spots}
    const newDays = days.map(day => day.name === dayName ? newDay : day)
    return newDays
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // save to appointments api, go to http://localhost:8001/api/debug/reset to reset
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      const days = updateSpots(state.day, state.days, appointments);
      console.log(res)
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      console.log(res);
      const days = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data}))
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview}
}
