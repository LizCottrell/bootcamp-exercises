// Create a basic command line Node application using the inquirer package.
// Your application should ask the user any five questions of your choosing.
// The question set should include at least one:

//    - Basic input,
//    - Password,
//    - List,
//    - Checkbox,
//    - and Confirm

// Then if a user's password matches a pre-defined password, re-display the data back to the user with some text.
// See the inquirer GitHub documentation "examples" page if you need help.

// Remember to be creative!

// ========================================================================

var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is Edith's name?",
      name: "username"
    },
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    {
      type: "list",
      message: "Which fish do you choose?",
      choices: ["Salmon", "Tuna", "Smelt"],
      name: "fish"
    },
    {
      type: "checkbox",
      message: "Select biggest fears:",
      choices: ["People touching me", "Other dogs", "Large sticks"],
      name: "pokemon"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("Your " + inquirerResponse.fish + " is ready to be eaten!\n");
    } else {
      console.log(
        "\nThat's okay " +
          inquirerResponse.username +
          ", come again when you are more sure.\n"
      );
    }
  });
