import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";


export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(STATUS)
    props.bookInterview(props.id, interview) //
    transition(SHOW)
  }

  function deleteInterview() {
    console.log(props.id);
    console.log('props.interview',props.interview)
    console.log('props.interviewers', props.interviewers)
    console.log('props.bookinterview',props.bookInterview)
    // props.interview = null
    transition(CONFIRM)
  }

  function deleteAppointment() {
    console.log('deted')
    // props.cancelInterview() type error
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          // interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save} //
          interviewers={props.interviewers} // change when getInterviewersForDay is implemented
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={() => back()}
        onConfirm={deleteAppointment} // need to make function to delete appointment
        />
      )}
      {mode === STATUS && (
        <Status />
      )}
    </article>
  )
}
