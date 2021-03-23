import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


// const classNames = require ('classnames');

// pass in props, assign value of map from days
export default function InterviewerList(props) {

  const interviewersList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        // setInterviewer={event => props.setInterviewer(interviewer.id)}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    );
  });

  function InterviewerList(props) {
    // interviewers: PropTypes.array
  }
  
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  // export default InterviewerList;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ interviewersList }</ul>
    </section>
  )
}
