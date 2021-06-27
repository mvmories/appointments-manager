import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";

export const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");

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

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      await fetch("/staff", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstname: name,
          lastname: lastname,
        }),
      });

      setName("");
      setLastName("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-column tc">
        <div className="w-100">
          <h1 className="mb5">Create New Staff Members</h1>
          <form className="mb6" onSubmit={handleSubmit}>
            <label>
              <span className="db fw4 lh-copy f6 mb1">First Name:</span>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure mb3"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span className="db fw4 lh-copy f6 mb1">Last Name:</span>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure mb3"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <p></p>
            <input
              className=" f5 bg-gray no-underline white bg-animate hover-bg-light-green hover-black inline-flex items-center pa2 pl4 pr4 ba border-box"
              type="submit"
              value="Create"
            />
          </form>
        </div>
        <div className="w-100">
          <h1>Staff List</h1>
          {staff.map((member) => (
            <div
              className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5"
              key={member.id}
            >
              <span className="b grey">ID: </span> {`${member.id}`}
              <p></p>
              <span className="b grey">Name: </span>{" "}
              {`${member.firstname} ${member.lastname}`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
