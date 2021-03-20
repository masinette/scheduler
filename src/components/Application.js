import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";



  // const interviewers = [
  //   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  //   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  //   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  //   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  //   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  // ];


export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  // const [interviewer, setInterviewer] = useState("");
  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  //const {mode, transition, back} = useVisualMode('life')

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
    
  });
  
  //Import the getInterviewersForDay selector. 
  //Use it to create an interviewers array that will first be passed to the 
  //Appointment component and then passed down to the Form component.


  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log("DAILYINTERVIEWERS",dailyInterviewers)

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments)

  const appointmentList = dailyAppointments.map(appointment => {  
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview= {bookInterview}
          cancelInterview= {cancelInterview}
        />
      )
  });


  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = 'http://localhost:8001/api/appointments';
    const interviewersURL = 'http://localhost:8001/api/interviewers';

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
    .then(all => {
      // console.log("DAYS",all[0].data);
      // console.log("APPT", all[1].data);
      // console.log("INTVWR", all[2].data);
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
        }));
    });
  }, [])



  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
/*
- Make the request with appointment id, with the interview data in the body
- When the response comes back we update the state using the existing setState.
*/
    const bookInterviewURL = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(bookInterviewURL, {interview}).then(()=>{
      setState({...state,appointments});   
    })
    
    // console.log(id, interview);
  }

  //use the appointment id to find the right appointment slot and set it's interview data to null.
    function cancelInterview(id) {
      console.log("Clicked trash can")

      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const cancelInterviewURL = `http://localhost:8001/api/appointments/${id}`;
      return axios.delete(cancelInterviewURL)
      .then(()=>{
        setState({...state,appointments});   
      })
      
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
        {/* call Daylist component define variable 'days' with days array to pass in as a prop
        invoke setDayfunction and log the value to console */}

        <DayList 
        // days array from response.data
        days={state.days} 
        // current day, selected
        day={state.day} 
        // sets the current day selection
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
        <Appointment 
          key="last"
          time="5pm"
        />
        
      </section>

    </main>

  );
}
