import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import InterviewerListItem from "components/InterviewerListItem";
import Button from "components/Button"


export default function Form (props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const reset = () => {
    if(name){
      return setName( name === "");
    }
    if(interviewer){
      return setInterviewer(interviewer === null);
    }
  }

  const cancel = (props) => {
    return (
      reset(),
      props.onCancel()
    )
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" 
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name={name}
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
        onChange={setName}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel} >Cancel</Button>

      {/* <Button danger onClick={cancel(props)}>Cancel</Button> */}
{/* TRYING TO CLEAR FORM AND APPLY PROPS.ONCANCEL ON CLICK 
INTERVIEWER NOT CLICKABLE */}

      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  )
}