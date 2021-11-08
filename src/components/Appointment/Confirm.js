import React from "react";
import Button from "components/Button";

// this component is rendered when deleting an appointment to give you the ability to confirm or deny the cancellation
export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>
          Cancel
        </Button>
        <Button danger onClick={onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
