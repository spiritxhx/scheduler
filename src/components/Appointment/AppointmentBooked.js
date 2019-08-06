import React from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';

export default function AppointmentEmpty(props) {
  return (
    <>
      <Header time={props.time} />
      <Show
        student={props.interviewer ? props.interview.student : undefined}
        interviewer={props.interviewer ? props.interview.interviewer : undefined}
      />
    </>
  )
}
