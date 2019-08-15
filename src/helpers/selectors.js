//get arrays of appointments of the day
export const getAppointmentsForDay = (state, day) => {
  let ans = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      // ans = state.days[i].appointments;
      ans = [...state.days[i].appointments];
    }
  }
  for (const appointment in state.appointments) {
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] === state.appointments[appointment].id) {
        ans[i] = state.appointments[appointment];
      }
    }
  }
  return ans;
};

export const getInterview = (state, interview) => {
  if (!interview || !state.interviewers) {
    return null;
  }
  let id = interview.interviewer;
  let studentName = interview.student;
  return {
    interviewer:
      state.interviewers[
        String(Object.keys(state.interviewers).find(key => id === Number(key)))
      ],
    student: studentName
  };
};

// get arrays of interviewers for the given day
export const getInterviewersForDay = (state, day) => {
  let ans = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      ans = [...state.days[i].interviewers];
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
};

export const getDayFromAppointmentId = (state, id) => {
  for (const day of state.days) {
    if (day.appointments.includes(Number(id))) {
      return day.name;
    }
  }
};

// get the available spots left for the given day
export const getSpotsForDay = (state, appointments, day) => {
  let spots = 0;
  //get the total spots for the day
  for (const eachDay of state.days) {
    if (eachDay.name === day) {
      spots = eachDay.appointments.length;
    }
  }

  //count the amount of appointments 
  for (const id in appointments) {
    if (
      getDayFromAppointmentId(state, id) === day &&
      appointments[id].interview
    ) {
      spots--;
    }
  }
  return spots;
};
