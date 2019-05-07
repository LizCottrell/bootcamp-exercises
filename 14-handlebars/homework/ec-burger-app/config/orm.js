var connection = require("./connection.js");

// Util - convert object to sequal
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, col, val, cb) {
    var queryString = "INSERT INTO " + table + " (" + col.toString() + ") ";
    queryString += "VALUES (?)";
    connection.query(queryString, [val], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function(table, objColVal, id, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVal);
    queryString += " WHERE id = " + id;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteOne: function(table, id, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE id = " + id;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;