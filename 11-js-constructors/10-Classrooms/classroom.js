var Student = require("./student");

var Classroom = function(classSize, professor, roomNum) {
  this.students = [];
  this.professor = professor;
  this.roomNum = roomNum;
  this.classSize = function() {
    return this.students.length;
  };

  this.newStudent = function(name, favSubject, gpa) {
    this.students.push(new Student(name, favSubject, gpa));
  };
};

module.exports = Classroom;
