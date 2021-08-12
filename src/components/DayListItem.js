import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames'

export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining"
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`
    } else if (props.spots >= 2) {
      return `${props.spots} spots remaining`
    }
  }

  const dayClass = classnames("day-list", {
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    "day-list__item--full": props.spots===0 ? true:false
  })

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name} </h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}