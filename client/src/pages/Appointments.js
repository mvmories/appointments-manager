import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import "./pages.css";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";
// import Select from "react-select";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(undefined);
  const [endtTime, setEndTime] = useState(undefined);

  const minDate = new Date();

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

  // FETCH STAFF MEMBERS
  useEffect(() => {
    let cancel = false;
    fetch("/staff")
      .then((res) => {
        if (cancel) return;
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setStaff(data.staff);
      });

    return () => {
      cancel = true;
    };
  }, []);

  // FETCH CLIENTS
  useEffect(() => {
    let cancel = false;
    fetch("/clients")
      .then((res) => {
        if (cancel) return;
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setClients(data.clients);
      });

    return () => {
      cancel = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    console.log(e);

    try {
      await fetch("/appointments", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          starttime: startTime,
          endtime: endtTime,
          description: description,
          clientId: selectedClientId,
          staffId: selectedStaffId,
        }),
      });

      setSelectedClientId(null);
      setSelectedStaffId(null);
      setDescription("");
      setStartTime(null);
      setEndTime(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStartDateTime = (args) => {
    const newDateTime = moment(args.value).utc().format("YYYY-MM-DD HH:mm:ss");
    // console.log(args.value);
    console.log(newDateTime);
    setStartTime(newDateTime);
  };

  const handleEndDateTime = (args) => {
    const newDateTime = moment(args.value).utc().format("YYYY-MM-DD HH:mm:ss");
    // console.log(args.value);
    console.log(newDateTime);
    setEndTime(newDateTime);
  };

  const handleClientSelection = (e) => {
    setSelectedClientId(e.target.value);
  };

  const handleStaffSelection = (e) => {
    setSelectedStaffId(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="flex flex-column tc">
        <div className="w-100">
          <h1 className="mb5">Create New Appointment</h1>
          <form className="mb6" onSubmit={handleSubmit}>
            {/* Title */}
            <label>
              <span className="db fw4 lh-copy f6 mb1">Subject Title:</span>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure mb4"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <p></p>
            {/* Start DateTime */}
            <label className="flex justify-center mb5">
              <div className="timerContainer">
                <DateTimePickerComponent
                  change={handleStartDateTime}
                  min={minDate}
                  placeholder="Choose a start date/time"
                  format="dd-MM-yyyy / HH:mm"
                  step={15}
                />
              </div>
            </label>
            {/* End DateTime */}
            <label className="flex justify-center mb5">
              <div className="timerContainer">
                <DateTimePickerComponent
                  change={handleEndDateTime}
                  min={minDate}
                  placeholder="Choose an end date/time"
                  format="dd-MM-yyyy / HH:mm"
                  step={15}
                />
              </div>
            </label>
            {/* Select Clients */}
            <label>
              <span className="db fw4 lh-copy f6 mb1">Select Client:</span>

              <select
                className="pa2 input-reset ba bg-transparent w-100 measure mb4"
                onChange={handleClientSelection}
              >
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                  >{`${client.name}`}</option>
                ))}
              </select>
            </label>
            {/* Select Staff */}
            <label>
              <span className="db fw4 lh-copy f6 mb1">Select Staff:</span>

              <select
                className="pa2 input-reset ba bg-transparent w-100 measure mb4"
                onChange={handleStaffSelection}
              >
                {staff.map((member) => (
                  <option
                    key={member.id}
                    value={member.id}
                  >{`${member.firstname} ${member.lastname}`}</option>
                ))}
              </select>
            </label>
            <p></p>
            {/* Button */}
            <input
              className=" f5 bg-gray no-underline white bg-animate hover-bg-light-green hover-black inline-flex items-center pa2 pl4 pr4 ba border-box"
              type="submit"
              value="Create"
            />
          </form>
        </div>
        <div className="w-100">
          <h1>Appointments List</h1>

          {appointments.map((appointment) => (
            <div
              className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5"
              key={appointment.id}
            >
              <span className="b grey">ID: </span> {`${appointment.id}`}
              <p></p>
              <span className="b grey">TITLE: </span>{" "}
              {`${appointment.description}`}
              <p></p>
              <span className="b grey">START: </span>{" "}
              {`${appointment.starttime}`}
              <p></p>
              <span className="b grey">END: </span> {`${appointment.endtime}`}
              <p></p>
              <span className="b grey">CLIENT_ID: </span>{" "}
              {`${appointment.clientId}`}
              <p></p>
              <span className="b grey">STAFF_ID: </span>{" "}
              {`${appointment.staffId}`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
