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

  function bookInterview(id, interview) {
    // console.log({ id, interview });
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({ ...state, appointments });
    return axios.put(`/api/appointments/${id}`, appointment);
  }

  function cancelInterview(id) {
    // console.log("id to cancel is:", id);

    return axios.delete(`/api/appointments/${id}`);
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get("/api/days").then((response) => {
          return response;
        })
      ),
      Promise.resolve(
        axios.get("/api/appointments").then((response) => {
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
