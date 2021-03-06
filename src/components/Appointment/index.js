import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import useVisualMode, {mode, transition, back} from "hooks/useVisualMode";

// const {mode, transition, back} = useVisualMode('');
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
// const {mode, transition, back} = useVisualMode(EMPTY);

const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  function save(name, interviewer) {
    console.log("INSIDE SAVE()", name, interviewer)
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    //create a new interview object to be passed to props.bookInterview
    props.bookInterview(props.id, interview)
    .then(()=>{
    // transition to SHOW when the promise returned by props.bookInterview resolves. This means that the PUT request is complete.
      transition(SHOW)
    })
    .catch((error)=>{
        transition(ERROR_SAVE, true)
    })
  }

  function remove(){
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    })
    .catch((error)=>{
      transition(ERROR_DELETE, true)
    })
  }

  function edit() {
    transition(EDIT)
  }

  function confirm(){
    transition(CONFIRM);
  }


return (
  <article className="appointment" data-testid="appointment">
    <Header time = {props.time}/>

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        // onDelete={remove}
        onEdit={edit}
      />)}

      {mode === EDIT && (
        <Form 
        interviewers={props.interviewers}
        // The Form should capture the name and interviewer and pass them to props.onSave as arguments
        onSave={save} 
        onCancel={() => back()}
      
      />)}


      {/* Use the back function to return to the EMPTY state when the cancel button is clicked. */}
      {mode === CREATE && 
        <Form 
        interviewers={props.interviewers}
        // The Form should capture the name and interviewer and pass them to props.onSave as arguments
        onSave={save} 

        onCancel={() => back()}
      />}

      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && 
      <Confirm message="Are you sure you would like to delete?" 
        onCancel={() => back()}
        onConfirm={remove}
      />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back()}/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => transition(CREATE)}/>}


  </article>
)

}