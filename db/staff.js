const knex = require("./knex");

function createStaff(staff) {
  return knex("staff").insert(staff);
}

function getAllStaff() {
  return knex("staff").select("*");
}

function deleteStaff(id) {
  return knex("staff").where("id", id).del();
}

function updateStaff(id, staff) {
  return knex("staff").where("id", id).update(staff);
}

module.exports = {
  createStaff,
  getAllStaff,
  deleteStaff,
  updateStaff,
};
