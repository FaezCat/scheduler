export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(
    (individualDay) => individualDay.name === day
  );

  const returnArray = [];
  let filteredApts = null;

  if (filteredDays.length !== 0) {
    filteredApts = filteredDays[0].appointments;
  }

  if (filteredApts) {
    for (const appt of filteredApts) {
      if (state.appointments[appt]) {
        returnArray.push(state.appointments[appt]);
      }
    }
  }

  return returnArray;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(
    (individualDay) => individualDay.name === day
  );

  const returnArray = [];
  let filteredInterviewers = null;

  if (filteredDays.length !== 0) {
    filteredInterviewers = filteredDays[0].interviewers;
  }

  if (filteredInterviewers) {
    for (const interviewID of filteredInterviewers) {
      if (state.interviewers[interviewID]) {
        returnArray.push(state.interviewers[interviewID]);
      }
    }
  }
  // console.log("interviewers return array:", returnArray);
  return returnArray;
}

export function getInterview(state, interview) {
  // console.log("state:", state);
  // console.log("interview:", interview);
  const interviewerObjs = { ...state.interviewers };
  // console.log("interviewerObjs:", interviewerObjs);

  let returnObj = null;
  let returnInterviewerObj = null;
  let student = null;

  if (interview) {
    student = interview.student;
    for (const interviewer in interviewerObjs) {
      // console.log("interviewer obj:", interviewer);
      // console.log("interview.interviewer:", interview.interviewer);
      if (interview.interviewer === interviewerObjs[interviewer].id) {
        returnInterviewerObj = interviewerObjs[interviewer];
      }
    }
    returnObj = {
      student: student,
      interviewer: { ...returnInterviewerObj },
    };
  }
  // console.log("returnInterviewerObj:", returnInterviewerObj);

  // console.log("return obj:", returnObj);
  return returnObj;
}
