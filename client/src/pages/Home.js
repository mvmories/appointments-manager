import React from "react";
import Header from "../components/Header/Header";
import EventCalendar from "../components/Calendar/EventCalendar";

export function Home() {
  return (
    <>
      <Header />
      <EventCalendar />
    </>
  );
}
