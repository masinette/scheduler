import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = state.days.map((day) => {
      if (state.day === day.name) {
        day.spots--;
      }
      return day;
    });
    /*
- Make the request with appointment id, with the interview data in the body
- When the response comes back we update the state using the existing setState.
*/
    const bookInterviewURL = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(bookInterviewURL, { interview }).then(() => {
      setState({ ...state, appointments, newDays });
    });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = state.days.map((day) => {
      if (state.day === day.name) {
        day.spots++;
      }
      return day;
    });

    //use the appointment id to find the right appointment slot and set it's interview data to null.
    const cancelInterviewURL = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(cancelInterviewURL).then(() => {
      setState({ ...state, appointments, newDays });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
