const express = require('express');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mock data

const waitList = [
  {
    customerName: 'Edith',
    phoneNumber: '2155555555',
    customerEmail: 'edith@gmail.com',
    customerID: 'edith'
  }
]

const tables = [
  {
    customerName: 'Scott',
    phoneNumber: '2155555555',
    customerEmail: 'scott@gmail.com',
    customerID: 'scott'
  }
]

 
// Routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/wait-list", function(req, res) {
  return res.json(waitList);
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});


// Post

app.post("/api/wait-list", function(req, res) {
  var newReservation = req.body;
  waitList.push(newReservation);
  res.json(newReservation);
});

app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  tables.push(newReservation);
  res.json(newReservation);
});


// Listen

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});