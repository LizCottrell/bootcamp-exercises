// Express
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
const routes = require("./controllers/burgers_controller.js");
app.use(routes);
