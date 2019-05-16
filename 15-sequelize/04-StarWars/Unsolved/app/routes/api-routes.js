var Character = require("../model/character.js");

module.exports = function(app) {

  app.get("/api/:characters?", function(req, res) {
    if (req.params.characters) {
      Character.findOne({
        where: {
          routeName: req.params.characters
        }
      }).then(function(results) {
        res.json(results);
      });
    } else {
      Character.findAll({}).then(function(results) {
        res.json(results);
      });
    }
  });

  app.post("/api/new", function(req, res) {
    var routeName = req.body.name.replace(/\s+/g, "").toLowerCase();

    Character.create({
      routeName: routeName,
      name: req.body.name,
      role: req.body.role,
      age: req.body.age,
      forcePoints: req.body.forcePoints
    })
    
    res.status(204).end();
  });
};
