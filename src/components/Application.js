import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import useApplicationData, { state, setDay, bookInterview, cancelInterview } from "hooks/useApplicationData.js";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  
  //Import the getInterviewersForDay selector. 
  //Use it to create an interviewers array that will first be passed to the 
  //Appointment component and then passed down to the Form component.
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
        {appointmentList}
        <Appointment 
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
