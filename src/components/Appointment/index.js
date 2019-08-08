import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';
// import Confirm from './Confirm';
// import Error from './Error';
import Show from './Show';
import Status from './Status';
import Form from './Form';
import { useVisualMode } from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

const save = (name, interviewer) => {
  const interview = {
    student: name,
    interviewer
  };
  return interview;
}

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(DELETING);
            props.deleteInterview(props.id)
              .then(() => { transition(Empty) })
              .catch(err => console.log(err))
          }}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(name, interviewer) => {
            if (name && interviewer) {
              transition(SAVING);
              props.bookInterview(props.id, save(name, interviewer))
                .then(() => transition(SHOW))
                .catch(err => console.log(err))
            } else {
              back();
            }
          }}
        />}
      {mode === SAVING &&
        <Status message="SAVING" />
      }
      {mode === DELETING &&
        <Status message="DELETING" />
      }
    </article>
  )
}
