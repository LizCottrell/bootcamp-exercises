var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Book = sequelize.define("book", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  genre: Sequelize.STRING,
  pages: Sequelize.INTEGER,
}, {
  freezeTableName: true
});

Book.sync();

module.exports = Book;