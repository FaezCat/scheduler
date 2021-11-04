import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
        interview: null,
      },
    },
    interviewers: {},
  });

  // These functions are responsible for setting the state of both "day" and "days", respectively
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days });

  // This function is responsible for calculating the remaining appointment spots per day (both initially and upon creating/deleting appointments)
  // additionally, note that this function returns the entire "days" state object for the purpose of then updating "days" entirely
  function spotsRemaining() {
    const index = state.days.findIndex((d) => d.name === state.day);
    const day = state.days[index];

    const appointments = { ...state.appointments };

    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = { ...day, spots };

    const newDays = state.days.map((d) => (d.name === state.day ? newDay : d));

    return newDays;
  }

  // this function is triggered each time a new interview is booked
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = { ...state.appointments };
    appointments[id].interview = interview;

    // A second option for updating interview - the utilized above was recommended by a mentor
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     appointments: {
    //       ...prevState.appointments,
    //       [id]: { ...prevState.appointments[id], interview },
    //     },
    //   };
    // });
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(setDays(spotsRemaining()));
  };

  // this function is triggered each time an interview is cancelled
  function cancelInterview(id) {
    const appointments = { ...state.appointments };
    appointments[id].interview = null;
    setState({ ...state, appointments });
    return axios
      .delete(`/api/appointments/${id}`)
      .then(setDays(spotsRemaining()));
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get("/api/days").then((response) => {
          // console.log("days data:", response);
          return response;
        })
      ),
      Promise.resolve(
        axios.get("/api/appointments").then((response) => {
          // console.log("appointments data:", response);
          return response;
        })
      ),
      Promise.resolve(
        axios.get("/api/interviewers").then((response) => {
          return response;
        })
      ),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
