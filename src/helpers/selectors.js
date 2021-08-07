function getAppointmentsForDay(state, day) {

  for (let id in state.days) {
    const dayName = state.days[id].name;

    if (day === dayName) {
      const appointments = state.days[id].appointments; // [1,2,3]
      let appointmentsForDay = [];
      appointments.forEach(appointment => {
        appointmentsForDay.push(state.appointments[appointment]) // pushes each appointment in to array 
      });
      return appointmentsForDay;
    } 
  }
  return [];
};

function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewer = state.interviewers[interview["interviewer"]]
  const student = interview["student"]
  let interviewObj = {}
  interviewObj.student = student
  interviewObj.interviewer = interviewer

  return interviewObj;
}

export { getAppointmentsForDay, getInterview}