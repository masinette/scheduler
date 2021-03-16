import React from "react";
// import classnames from 'classnames';
import DayListItem from "components/DayListItem";

// pass in props, assign value of map from days
export default function Daylist(props) {

  const dayLists = props.days.map((day) => (

    <DayListItem 
      name={ day.name } 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  
    />

  ));
  return (
    <ul>
      { dayLists }
    </ul>
  )
}