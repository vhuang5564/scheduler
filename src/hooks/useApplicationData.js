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

  const updateSpots = (dayName, days, appointments) => { // might need to setstate
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
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((res) => {
      console.log(res)
      updateSpots(state.day, state.days, state.appointments);
    })

    setState({
      ...state,
      appointments
    });

  }

  function cancelInterview(id) {
    setTimeout(axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => {
      console.log(res);
      updateSpots(state.day, state.days, state.appointments);
    }), 10000)
  }

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

  return { state, setDay, bookInterview, cancelInterview}
}
