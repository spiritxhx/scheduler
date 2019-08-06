import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => {
          event.preventDefault();
        }}  >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers}
          value={interviewer}
          onChange={event => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button confirm onClick={props.onSave(name, interviewer)} >Save</Button>
        </section>
      </section>
    </main>
  )
}
