import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import Button from "components/Button";


export default function Form (props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = (props) => {
      reset();
      // props.onCancel();
      props.onCancel();

  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" 
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name="StudentName"
        type="text"
        placeholder="Enter Student Name"
        value= {name}
        onChange={event => setName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      {/* <Button danger onClick={cancel} >Cancel</Button> */}
      {/* {interviewers={interviewers}} */}
      <Button danger onClick={(event) =>cancel(props)} >Cancel</Button>
      <Button confirm onClick={(event) =>props.onSave(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}