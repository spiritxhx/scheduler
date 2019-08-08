

export const getAppointmentsForDay = (state, day) => {
  let appointmentsId = state.days
    .filter((e) => e.name === day)
    .map((e) => e.appointments)
    .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appointmentsId.forEach((e) => {
    appointment.push(state.appointments[e]);
  })
  return appointment;
}

export function getInterview(state, interview) {
  if (!interview || !state.interviewers) {
    return null;
  }
  let id = interview.interviewer;
  let studentName = interview.student;
  return {
    interviewer: state.interviewers[String(Object.keys(state.interviewers).find(key => id === Number(key)))],
    student: studentName
  }
}

export function getInterviewersForDay(state, day) {
  let ans = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      ans = state.days[i].interviewers;
    }
  }
  for (const interviewer in state.interviewers) {
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] === Number(interviewer)) {
        ans[i] = state.interviewers[String(interviewer)];
      }
    }
  }
  return ans;
}