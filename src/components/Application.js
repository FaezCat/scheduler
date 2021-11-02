import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import { useState, useEffect } from "react";

import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

import { Fragment } from "react";

import axios from "axios";

export default function Application(props) {
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

  function bookInterview(id, interview) {
    console.log({ id, interview });
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // setState((prevState) => ({ ...prevState, appointments }));
    setState({ ...state, appointments });
    return axios.put(`/api/appointments/${id}`, appointment);
  }

  function cancelInterview(id) {
    console.log("id to cancel is:", id);

    return axios.delete(`/api/appointments/${id}`);
  }

  const setDay = (day) => setState({ ...state, day });

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {dailyAppointments.map((appointment) => {
            const interview = getInterview(state, appointment.interview);
            // console.log("interview:", interview);
            // slightly concerned that {interview} isn't rendering correctly
            return (
              <Appointment
                key={appointment.id}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
                interview={interview}
                interviewers={dailyInterviewers}
                {...appointment}
              />
            );
          })}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
