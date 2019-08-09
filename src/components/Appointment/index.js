import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';
import Confirm from './Confirm';
import Error from './Error';
import Show from './Show';
import Status from './Status';
import Form from './Form';
import { useVisualMode } from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const UPDATE = "UPDATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

      {(mode === EMPTY || mode === SHOW) && (!props.interview) &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {((mode === SHOW || mode === EMPTY) && (props.interview))
        &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(UPDATE);
          }}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(name, interviewer) => {
            if (name && interviewer) {
              transition(SAVING, true);
              props.bookInterview(props.id, save(name, interviewer), props.day)
                .then(() => transition(SHOW))
                .catch(err => {
                  console.log(err);
                  transition(ERROR_SAVE, true);
                })
            } else {
              back();
            }
          }}
        />}
      {mode === UPDATE &&
        <Form
          name={props.interview.student}
          value={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(name, interviewer) => {
            if (name && interviewer) {
              transition(SAVING, true);
              props.bookInterview(props.id, save(name, interviewer), props.day)
                .then(() => transition(SHOW))
                .catch(err => {
                  console.log(err);
                  transition(ERROR_SAVE, true);
                })
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
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you want to delete this interview?"
          onConfirm={() => {
            transition(DELETING, true)
            props.cancelInterview(props.id, props.day)
              .then(() => { transition(EMPTY) })
              .catch(err => {
                console.log(err);
                transition(ERROR_DELETE, true);
              })
          }}
          onCancel={back} />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Something worong when you're tring to save this interview!"
          onClose={() => {
            back();
            back();
          }}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Something worong when you're tring to delete this interview!"
          onClose={() => {
            back();
            back();
          }}
        />
      }
    </article>
  )
}
