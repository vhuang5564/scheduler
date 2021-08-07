export function getAppointmentsForDay(state, day) {
  let dayName = ""

  for (let id in state.days) {
    dayName = state.days[id].name

    if (day === dayName) {
      const appointments = state.days[id].appointments // [1,2,3]
      let map = []
      appointments.forEach(appointment => {
        map.push(state.appointments[appointment]) // pushes each appointment in to array 
      })
      console.log(map);
      return map;
    } 
  }

  return [];
}