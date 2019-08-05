import React from 'react';
import "components/interviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function interviewerList(props) {
  return (
    <section className="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul>
        {
          props.interviewers.map(interviewer => {
            return <InterviewerListItem
              name={interviewer.name}
              avatar={interviewer.avatar}
              setInterviewer={event=>props.onChange(interviewer.name)}
              selected={props.value === interviewer.id} />
          })
        }
      </ul>
    </section>
  )
}
