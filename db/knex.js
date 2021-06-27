const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "events.sqlite3",
  },
});

module.exports = connectedKnex;
