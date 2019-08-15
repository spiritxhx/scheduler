import {getSpotsForDay} from '../helpers/selectors';

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export const reducer = (state, action) => {
  const { day, days, appointments, interviewers, id, interview } = action;
  //check the action type being passed in for different despatch
  switch (action.type) {
    case SET_DAY:
      return { ...state, day };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days,
        appointments,
        interviewers
      };

    case SET_INTERVIEW: {
      const dayObj = state.days.find(eachDay => eachDay.name === day);
      const dayIndex = dayObj.id - 1;
      const appointment = {
        ...state.appointments[id],
        interview: interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      dayObj.spots = getSpotsForDay(state, appointments, day);
      const days = state.days;
      days[dayIndex] = dayObj;
      return {
        ...state,
        appointments: { ...appointments },
        days
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};