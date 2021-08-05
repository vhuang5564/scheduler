import React from 'react'
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import classnames from 'classnames';

export default function InterviewerList(props) {

  const interviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value} // props.interviewer
      setInterviewer={event => props.onChange(interviewer.id)} // props.setInterviewer
      />
    )
  })

  const interviewerClass = classnames("interviewers", {
    "interviewers__header": true,
    "interviewers__list": true
  })

  return (
    <section className={interviewerClass} onClick={props.setInterviewer}> 
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  )
}