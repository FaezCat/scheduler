// this function retrieves the list of appointments for each individual day of the week
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

// this function retrieves the list of available interviewers for each individual day of the week (interviewers vary in weekday availability, hence this function)
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(
    (individualDay) => individualDay.name === day
  );

  const returnObject = {};
  let filteredInterviewers = null;

  if (filteredDays.length !== 0) {
    filteredInterviewers = filteredDays[0].interviewers;
  }

  if (filteredInterviewers) {
    for (const interviewID of filteredInterviewers) {
      if (state.interviewers[interviewID]) {
        returnObject[interviewID] = state.interviewers[interviewID];
      }
    }
  }
  return returnObject;
}

// this function generates interview objects which are later included within corresponding appointment objects
export function getInterview(state, interview) {
  const interviewerObjs = { ...state.interviewers };

  let returnObj = null;
  let returnInterviewerObj = null;
  let student = null;

  if (interview) {
    student = interview.student;
    for (const interviewer in interviewerObjs) {
      if (interview.interviewer === interviewerObjs[interviewer].id) {
        returnInterviewerObj = interviewerObjs[interviewer];
      }
    }
    returnObj = {
      student: student,
      interviewer: { ...returnInterviewerObj },
    };
  }

  return returnObj;
}
