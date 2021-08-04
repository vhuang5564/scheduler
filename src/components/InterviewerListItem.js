import React from 'react'
import "components/InterviewerListItem.scss";
import classnames from 'classnames';


export default function InterviewerListItem(props){

  const interviewerClass = classnames("interviewers", {
    'interviewers__item':true,
    'interviewers__item--selected': props.selected,
  })

  return (
    <li onClick={() => props.setInterviewer(props.name)}className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  )
}