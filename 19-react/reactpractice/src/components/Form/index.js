import React, { Component } from "react";
import "./style.css";

class Form extends Component {
  // Setting the component's initial state
  state = {
    firstName: "",
    lastName: "",
    password: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.firstName === "" || this.state.lastName === "") {
      alert('Fill out your first and last name, please!')
    } else if (this.state.password.length < 6) {
      alert(`Choose a more secure password, ${this.state.firstName} ${this.state.lastName}`)
    } else {
      alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
      this.setState({
        firstName: "",
        lastName: "",
        password: ""
      });
    }
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <p>
          Hello {this.state.firstName} {this.state.lastName}
        </p>
        <form className="form">
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <input
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Password"
            maxLength="10"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
