var orm = require("../config/orm.js");

var burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  insertOne: function(col, val, cb) {
    orm.insertOne("burgers", col, val, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVal, id, cb) {
    orm.updateOne("burgers", objColVal, id, function(res) {
      cb(res);
    });
  },
  deleteOne: function(id, cb) {
    orm.deleteOne("burgers", id, function(res) {
      cb(res);
    })
  }
};

module.exports = burger;