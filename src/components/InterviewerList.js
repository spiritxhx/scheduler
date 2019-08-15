import React from "react";
import "components/interviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function interviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {/* 
          map through the props.interviewers array to render list item
         */}
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.name}
              name={interviewer.name}
              avatar={interviewer.avatar}
              setInterviewer={event => props.onChange(interviewer.id)}
              selected={props.value === interviewer.id}
            />
          );
        })}
      </ul>
    </section>
  );
}

interviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
