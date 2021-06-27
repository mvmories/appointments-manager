const knex = require("./knex");

function createClient(client) {
  return knex("clients").insert(client);
}

function getAllClients() {
  return knex("clients").select("*");
}

function deleteClient(id) {
  return knex("clients").where("id", id).del();
}

function updateClient(id, client) {
  return knex("clients").where("id", id).update(client);
}

module.exports = {
  createClient,
  getAllClients,
  deleteClient,
  updateClient,
};
