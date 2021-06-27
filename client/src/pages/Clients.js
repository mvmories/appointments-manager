import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");

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
      })
      .catch((err) => console.log(err));

    return () => {
      cancel = true;
      console.log("unmounting");
    };
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      await fetch("/clients", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      setName("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-column tc">
        <div className="w-100">
          <h1 className="mb5">Create New Client</h1>
          <form className="mb6" onSubmit={handleSubmit}>
            <label>
              <span className="db fw4 lh-copy f6 mb1">Name:</span>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure mb3"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          <h1>Client List</h1>

          {clients.map((client) => (
            <div
              className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5"
              key={client.id}
            >
              <span className="b grey">ID: </span> {`${client.id}`}
              <p></p>
              <span className="b grey">Name: </span> {`${client.name}`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
