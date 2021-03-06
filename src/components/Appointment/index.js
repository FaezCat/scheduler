import React from "react";
import "components/Appointment/styles.scss";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "./Status";
import { Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// the main Appointment component makes use of the other components listed within the Appointment folder
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // this function is triggered upon saving an appointment which subsequently updates our visual mode, mode history, and updates the PSQL database
  // additionally, the "SAVING" transition below is responsible for the visual "loading" display as the database is being updated
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // this function is triggered upon deleting an appointment which subsequently updates our visual mode, mode history, and updates the PSQL database
  // additionally, the "DELETING" transition below is responsible for the visual "loading" display as the database is being updated
  function deleteAppointment(id) {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }
  // state-dependent (mode) component rendering
  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            onDelete={() => transition(CONFIRM)}
            onEdit={edit}
            interviewer={
              props.interview.interviewer &&
              props.interviewers[props.interview.interviewer]
            }
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            onConfirm={deleteAppointment}
            onCancel={back}
            message="Are you sure you would you like to delete?"
          />
        )}
        {mode === CREATE && (
          <Form
            onSave={save}
            interviewers={props.interviewers}
            onCancel={back}
          />
        )}
        {mode === EDIT && (
          <Form
            onSave={save}
            onCancel={back}
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not save appointment." onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not delete appointment." onClose={back} />
        )}
      </Fragment>
    </article>
  );
}
