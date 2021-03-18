import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
     {
    id: 3,
    time: "11pm",
  },
    {
    id: 4,
    time: "10pm",
    interview: {
      student: "Terrence Jeffords",
      interviewer: {
        id: 2,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
    {
    id: 5,
    time: "2pm",
  }
];

  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  const [interviewer, setInterviewer] = useState("");

  // const interviewers = getAppointmentsForDay(state, state.day)

  const appointmentList = appointments.map(appointment => {  
    return (<Appointment 
      key={appointment.id} 
      id={appointment.id} 
      time={appointment.time} 
      interview={appointment.interview} 
    />
    )
  });

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    axios.get(daysURL).then(response => {
      console.log(response);
      setDays(response.data);
    });
  }, [])

  const getAppointmentsForDay = function (state, day){
    //return an array of appointments for the given day
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
        days={days} 
        // current day, selected
        day={day} 
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

        {/* <InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={setInterviewer} /> */}
      </section>

    </main>

  );
}
