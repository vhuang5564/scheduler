import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";


export default function Appointment(props) { // transition status doesnt show its too fast
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
      const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props
    .bookInterview(props.id, interview)
    // .then(() => transition(SHOW))
    // .catch(error => transition(ERROR_SAVE, true))
    transition(SHOW) // delete this when props is a promise
  }

  function deleteInterview() {
    transition(CONFIRM)
  }

  function deleteAppointment() {
    transition(SAVING)
    props.cancelInterview(props.id)
    // .then(() => transition(EMPTY))
    // .catch(error => transition(ERROR_DELETE, true))
    transition(EMPTY) // delete this when props is a promise
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
      {mode === SAVING && (
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
      {mode === ERROR_SAVE && (
        <Error 
        message="Could not save appointment"
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Could not delete appointment"
        onClose={back}
        />
      )}
    </article>
  )
}
