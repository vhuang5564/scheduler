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
  if (!interview) {
    return null
  }

  const interviewerId = interview["interviewer"] // 2
  const interviewer = state.interviewers[interviewerId]
  const student = interview["student"]
  let interviewObj = {}
  interviewObj.student = student
  interviewObj.interviewer = interviewer

  return interviewObj;
}

function getInterviewersForDay(state, day) {

  for (let id in state.days) {
    const dayName = state.days[id].name;

    if (day === dayName) {

      const interviewerIds = state.days[id].interviewers // [1,2,3,4,5]
      let interviewersForDay = []

      interviewerIds.forEach(interviewer => {
        interviewersForDay.push(state.interviewers[interviewer])
      })

      return interviewersForDay
    } 
  }
  return [];
};




export { getAppointmentsForDay, getInterview, getInterviewersForDay}

