const knex = require("./knex");

function createAppointment(appointment) {
  return knex("appointments").insert(appointment);
}

function getAllAppointments() {
  return knex("appointments").select("*");
}

function deleteAppointment(id) {
  return knex("appointments").where("id", id).del();
}

function updateAppointment(id, appointment) {
  return knex("appointments").where("id", id).update(appointment);
}

module.exports = {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
};
