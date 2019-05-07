var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// GET Home
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    res.render("index", { burgers: data } );
  });
});

// GET Burger API
router.get("/api", function(req, res) {
  burger.selectAll(function(data) {
    res.json(data);
  });
});

// POST Burger
router.post("/api", function(req, res) {
  console.log(req.body)
  burger.insertOne("burger_name", req.body.burger_name, function(result) {
    res.json({ id: result.insertId });
  });
}); 

// PUT / UPDATE Burger
router.put("/api/:id", function(req, res) {
  burger.updateOne({
    devoured: req.body.devoured
  }, req.params.id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
}); 

// DELETE Burger
router.delete("/api/:id", function(req, res) {
  burger.deleteOne(req.params.id, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});


module.exports = router;