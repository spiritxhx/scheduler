import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';
import Confirm from './Confirm';
import Error from './Error';
import Show from './Show';
import Status from './Status';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Empty />
    </article>
  )
}
