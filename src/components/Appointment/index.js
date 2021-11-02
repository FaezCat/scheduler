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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    await props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function deleteAppointment(id) {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  function edit() {
    transition(EDIT);
  }

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
            message="Would you like to delete?"
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
      </Fragment>
    </article>
  );
}
