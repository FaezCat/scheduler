import React from "react";
import DayListItem from "./DayListItem";

// the component displays on the left hand side of the screen for Mon-Fri (essentially a container for each individual daylistitem)
export default function DayList(props) {
  const listItems = props.days.map((item) => (
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === props.value}
      setDay={props.onChange}
    />
  ));

  return <ul>{listItems}</ul>;
}
