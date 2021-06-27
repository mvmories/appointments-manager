import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import EventCalendar from "../components/Calendar/EventCalendar";
import moment from "moment";

export function Home() {
  let EventSettingsModel = {
    dataSource: [
      {
        Subject: "New Text",
        StartTime: moment("27/06/2021 4:00:00", "DD MM YYYY hh:mm:ss"),
        EndTime: moment("27/06/2021 6:30:00", "DD MM YYYY hh:mm:ss"),
      },
    ],
  };
  let localData = EventSettingsModel;

  return (
    <>
      <Header />
      <EventCalendar />
    </>
  );
}
