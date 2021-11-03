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

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days });

  function spotsRemaining() {
    const index = state.days.findIndex((d) => d.name === state.day);
    const day = state.days[index];

    const appointments = { ...state.appointments };
    // console.log("appointments:", appointments);

    // console.log("day.appointments:", day.appointments);
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    console.log("spots:", spots);
    const newDay = { ...day, spots };

    const newDays = state.days.map((d) => (d.name === state.day ? newDay : d));
    console.log("new days object:", newDays);
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments };
    appointments[id].interview = interview;
    console.log("appointment:", appointment);

    setState({ ...state, appointments });
    console.log("appointments post state change:", state.appointments);
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(setDays(spotsRemaining()));
  }

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
          console.log("days data:", response);
          return response;
        })
      ),
      Promise.resolve(
        axios.get("/api/appointments").then((response) => {
          console.log("appointments data:", response);
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
