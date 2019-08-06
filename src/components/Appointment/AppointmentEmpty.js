import React from 'react';
import Header from './Header';
import Empty from './Empty';

export default function AppointmentEmpty(props) {
  return (
    <>
      <Header time={props.time} />
      <Empty />
    </>
  )
}
