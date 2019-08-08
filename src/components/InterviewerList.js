import React from 'react';
import "components/interviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function interviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list" >
        {
          props.interviewers.map(interviewer => {
            return <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              setInterviewer={event => props.onChange(interviewer.id)}
              selected={props.value === interviewer.id} />
          })
        }
      </ul>
    </section>
  )
}
