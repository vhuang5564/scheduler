import React from 'react'
import "components/InterviewerListItem.scss";
import classnames from 'classnames';


export default function InterviewerListItem(props){

  const interviewerClass = classnames("interviewers", {
    'interviewers__item':true,
    'interviewers__item--selected': props.selected,
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

// return ( onclick will give back name in string form instead of class
//   <li onClick={() => props.setInterviewer(props.name)}className={interviewerClass}>
//     <img
//       className="interviewers__item-image"
//       src={props.avatar}
//       alt={props.name}
//     />
//     {props.name}
//   </li>
// )