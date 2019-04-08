function Programmer(name, role, age, favLang) {
  this.name = name;
  this.role = role;
  this.age = age;
  this.favLang = favLang;
}

Programmer.prototype.printInfo = function() {
  console.log(
    "Name: " +
      this.name +
      "\nPosition: " +
      this.role +
      "\nAge: " +
      this.age +
      "\nLanguages: " +
      this.favLang
  );
};

var edith = new Programmer("edith", "dog", 7, "fish");

edith.printInfo();
