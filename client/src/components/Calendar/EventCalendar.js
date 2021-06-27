import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

import "./calendar.css";

const EventCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  // const [viewModal, setViewModal] = useState(false)

  // FETCH APPOINTMENTS
  useEffect(() => {
    let cancel = false;
    fetch("/appointments")
      .then((res) => {
        if (cancel) return;
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setAppointments(data.appointments);
      });
    return () => {
      cancel = true;
    };
  }, []);

  console.log(appointments);

  let mapEvents = [];

  appointments.map((appointment) =>
    // mapEvents.push({ title: appointment.description, date: "2021-06-27" })
    mapEvents.push({
      title: appointment.description,
      description: `event between client ${appointment.clientId} and staffmember ${appointment.staffId}`,
      start: appointment.starttime,
      end: appointment.endtime,
    })
  );

  console.log(mapEvents);

  // const testEvent = [
  //   { title: "event 1", date: "2021-06-28" },
  //   { title: "event 2", date: "2021-06-28" },
  //   { title: "event 3", date: "2021-06-29" },
  // ];

  const handleEventClick = (clickInfo) => {
    alert(`    [Event]
    ${clickInfo.event.title}
    
    [Meeting Between] 
    ${clickInfo.event._def.extendedProps.description}

    [Starts] 
    ${moment(clickInfo.event._instance.range.start)
      .utc()
      .format("DD-MMM-YYYY HH:mm:ss")}

    [Ends]
    ${moment(clickInfo.event._instance.range.end)
      .utc()
      .format("DD-MMM-YYYY HH:mm:ss")}
    
    `);
    console.log(clickInfo);
  };

  return (
    <>
      <div className="pa3 pl4 pr4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={mapEvents}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
        />
      </div>
    </>
  );
};

export default EventCalendar;
