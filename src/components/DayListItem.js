import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// this function renders each individual daylistitem displayed on the left hand side of the screen
export default function DayListItem(props) {
  // this simple function dictates the text displaying the # of spots remaining beneath each day
  function formatSpots() {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return props.spots + " spots remaining";
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      key={props.id}
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
