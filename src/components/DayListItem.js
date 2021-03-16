import React from "react";
import "components/DayListItem.scss";
// import { render } from "@testing-library/react";
const classNames = require ('classnames');


export default function DayListItem(props) {
  const formatSpots = (props) => {
    if (props === 0){
      return "no spots remaining";
    }
    if (props === 1){
      return "1 spot remaining";
    }
    else {
      return `${props} spots remaining`;
    }
  }

  const dayClass = classNames("day-list", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  return (
    <li className={ dayClass } onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2>
      {/* <h3 className="text--light"> {props.spots} spots remaining</h3> */}
      <h3 className="text--light"> { formatSpots(props.spots) }</h3>
    </li>
  );
}


