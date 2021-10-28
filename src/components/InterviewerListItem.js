import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

// setInterviewer:function - is run when the InterviewerListItem is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

function InterviewerListItem(props) {
  const interviewerName = props.name;
  console.log(props);

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={interviewerName}
      />
      {props.selected && interviewerName}
    </li>
  );
}

export default InterviewerListItem;
