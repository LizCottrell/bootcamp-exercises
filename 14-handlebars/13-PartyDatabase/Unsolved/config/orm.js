var connection = require("./connection.js");

var orm = {
  // Console log all the party names.
  // Console log all the client names.
  selectFrom: function(column, table) {
    const queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [column, table], function(err, result) {
      if (err) throw err;
      console.log(result);
      console.log('-----')
    });
  },

  // Console log all the parties that have a party-type of grown-up.
  selectWhere: function(table, column, colValue) {
    const queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [table, column, colValue], function(err, result) {
      if (err) throw err;
      console.log(result);
      console.log('-----')
    });
  },

  // Console log all the clients and their parties.
  findAll: function(tableOne, tableTwo, tableOneCol, tableTwoCol) {
    var queryString =
      "SELECT * FROM ?? LEFT JOIN ?? ON ??.?? = ??.??";

    connection.query(
      queryString,
      [tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol],
      function(err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  }

};

module.exports = orm;
