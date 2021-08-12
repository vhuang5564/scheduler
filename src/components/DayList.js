import React from 'react'
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem"

export default function DayList(props){

  // iterates and returns each object in array
  const dayList = props.days.map(day => {
    return (
      <DayListItem
      key={day.id} // for unique key... ???
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    )
  })

  return(
    <ul data-testid="day">
      {dayList}
    </ul>
  )
}