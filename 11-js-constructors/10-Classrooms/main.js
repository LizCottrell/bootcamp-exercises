var Classroom = require("./classroom.js");

var scienceClass = new Classroom(0, "Dr. Edith", "63");

scienceClass.newStudent("Edith", "Fish", "3.2");
scienceClass.newStudent("Scott", "Math", "3.8");

console.log(scienceClass);
console.log(scienceClass.length);
