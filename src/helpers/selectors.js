export function getAppointmentsForDay (state, day){

let apptsForDay = []
//Once we have access to the appointment array for the given day, we'll need to
  for (let i in state.days){
    if ((state.days[i].name) === day){

      const apptsIds = state.days[i].appointments;

      // iterate through it, comparing where it's id matches the id of states.appointments and return that value.
      for (let a in apptsIds){
        const appt = state.appointments[apptsIds[a]];
        apptsForDay.push(appt);
      }
    }
  }
//if there are no appointments on the given day, our days data will be empty.
  return apptsForDay;
}

export function getInterview(state, interview){
  if (!interview){
    return null;
  }
return {...interview, interviewer: state.interviewers[interview.interviewer]}
}
