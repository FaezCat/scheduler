import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

// this component renders each individual interviewer within the interviewerlist component
function InterviewerListItem(props) {
  const interviewerName = props.name;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
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
