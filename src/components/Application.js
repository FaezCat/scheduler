import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

import { Fragment } from "react";

// main application function that renders both the daylist on the left of the screen (Mon-Fri) and all appointment slots / bookings on the right
export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

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
