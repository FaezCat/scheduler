import React from "react";

// this component is rendered for all booked appoitments
export default function Show(props) {
  const { student, interviewer, onEdit, onDelete } = props;

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        {interviewer && (
          <section className="interviewer">
            <h4 className="text--light">Interviewer</h4>
            <h3 className="text--regular">{interviewer.name}</h3>
          </section>
        )}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            onClick={() => onEdit()}
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            onClick={() => onDelete(props.id)}
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
}
