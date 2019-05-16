// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", function(req, res) {
    var queryString = "SELECT * FROM chirps"
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Add a chirp
  app.post("/api/new", function(req, res) {
    connection.query("INSERT INTO chirps (author, chirp, time_stamp) VALUES (?, ?, ?)", [req.body.author, req.body.chirp, req.body.time_stamp], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
};
