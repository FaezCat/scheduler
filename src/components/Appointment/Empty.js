import React from "react";

// this component is rendered when an appointment slot is available (empty)
export default function Empty(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        onClick={onAdd}
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
