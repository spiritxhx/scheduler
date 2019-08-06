

export function getAppointmentsForDay(state, day) {
  let ans = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      ans = state.days[i].appointments;
    }
  }
  for (const appointment in state.appointments) {
    for (let i=0;i<ans.length;i++){
      if(ans[i]===state.appointments[appointment].id){
        ans[i]=state.appointments[appointment];
      }
    }
  }
  return ans;
}