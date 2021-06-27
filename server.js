const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex");
const dbStaff = require("./db/staff");
const dbClients = require("./db/client");
const dbAppointments = require("./db/appointment");
const path = require("path");

const PORT = process.env.PORT || 3001;

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080",
  "https://blooming-gorge-42759.heroku",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

/*
 *
 * STAFF
 *
 */

// Get Staff
app.get("/staff", async (req, res) => {
  const staff = await dbStaff.getAllStaff();
  res.status(200).json({ staff });
});

// Create StaffMember
app.post("/staff", async (req, res) => {
  const results = await dbStaff.createStaff(req.body);
  res.status(200).json({ id: results[0] });
});

// Update StaffMember
app.patch("/staff/:id", async (req, res) => {
  const id = await dbStaff.updateStaff(req.params.id, req.body);
  res.status(200).json({ success: true });
});

// Delete StaffMember
app.delete("/staff/:id", async (req, res) => {
  const id = await dbStaff.deleteStaff(req.params.id);
  res.status(200).json({ success: true });
});

/*
 *
 * CLIENTS
 *
 */

// Get Client
app.get("/clients", async (req, res) => {
  const clients = await dbClients.getAllClients();
  res.status(200).json({ clients });
});

// Create Client
app.post("/clients", async (req, res) => {
  const results = await dbClients.createClient(req.body);
  res.status(200).json({ id: results[0] });
});

// Update Client
app.patch("/clients/:id", async (req, res) => {
  const id = await dbClients.updateClient(req.params.id, req.body);
  res.status(200).json({ success: true });
});

// Delete Client
app.delete("/clients/:id", async (req, res) => {
  const id = await dbClients.deleteClient(req.params.id);
  res.status(200).json({ success: true });
});

/*
 *
 * APPOINTMENTS
 *
 */

// Get Appointments
app.get("/appointments", async (req, res) => {
  const appointments = await dbAppointments.getAllAppointments();
  res.status(200).json({ appointments });
});

// Create Appointment
app.post("/appointments", async (req, res) => {
  const results = await dbAppointments.createAppointment(req.body);
  res.status(200).json({ id: results[0] });
});

// Update Appointment
app.patch("/appointments/:id", async (req, res) => {
  const id = await dbAppointments.updateAppointment(req.params.id, req.body);
  res.status(200).json({ success: true });
});

// Delete Appointment
app.delete("/appointments/:id", async (req, res) => {
  const id = await dbAppointments.deleteAppointment(req.params.id);
  res.status(200).json({ success: true });
});

// Teste
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
