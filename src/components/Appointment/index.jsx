import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";


export default function Appointment(props) { // transition status doesnt show its too fast
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    if (!name || !interviewer) { // prevents empty name/interviewer
      return
    }

    const interview = {
      student: name,
      interviewer
    };
    // transition(STATUS)
    props.bookInterview(props.id, interview)
    transition(SHOW)
  }

  function deleteInterview() {
    transition(CONFIRM)
  }

  function deleteAppointment() { // transition status doesnt show its too fast
    transition(STATUS)
    props.cancelInterview(props.id)
    transition(STATUS)
    transition(EMPTY)
  }

  function editAppointment() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={deleteInterview}
          onEdit={editAppointment}
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
      {mode === EDIT && (
        <Form
        onSave={save} //
        interviewers={props.interviewers} // change when getInterviewersForDay is implemented
        onCancel={() => back()}
        name={props.interview.student}
        interviewer={props.interviewer.id}
        />
      )}
    </article>
  )
}
