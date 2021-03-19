import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import useVisualMode, {mode, transition, back} from "hooks/useVisualMode";

// const {mode, transition, back} = useVisualMode('');
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";




export default function Appointment(props) {
// const {mode, transition, back} = useVisualMode(EMPTY);

const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

return (
  <article className="appointment">
    <Header time = {props.time}/>

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}

      {/* Use the back function to return to the EMPTY state when the cancel button is clicked. */}
      {mode === CREATE && 
        <Form 
        interviewers={props.interviewers}
        onSave={() => console.log("Clicked Save")} 
        onCancel={() => back()}
      />}

      {/* {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />} */}
  </article>
)

}