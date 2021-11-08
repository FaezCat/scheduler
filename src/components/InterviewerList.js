import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// this component renders the list of available interviewers for each day
export default function InterviewerList(props) {
  const interviewListItems = Object.values(props.interviewers).map(
    (interviewer) => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={() => props.onChange(interviewer.id)}
          selected={interviewer.id === props.value}
        />
      );
    }
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewListItems}</ul>
    </section>
  );
}
