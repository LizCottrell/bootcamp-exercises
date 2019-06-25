import React, { Component } from "react";
import API from '../utils/API';

class Discover extends Component {
  state = {
    image: "",
    match: false,
    matchCount: 0
  };

  componentDidMount(){
    this.getDog();
  }

  getDog = () => {
    API.getRandomDogPic()
      .then(res => this.setState({ image: res.data.message }))
      .catch(err => console.log(err));
  };

  handleDogVote = () => {
    this.getDog()
  }

  render() {
    return (
      <div>
        <h1>Make New Friends</h1>
        <p>Thumbs up on any pups you'd like to meet!</p>
  
        <div className="card">
          <img src={this.state.image} alt="" />
        </div>

        <div className="card-buttons">
          <button 
            onClick={this.handleDogVote}
            class="btn card-btn no" 
            data-value="no"
          >
            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
          </button>
          <button 
            onClick={this.handleDogVote}
            class="btn card-btn yes" 
            data-value="yes">
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
        </div>
        
  
        <p>Made friends with 0 pups so far!</p>
      </div>
    );
  }
}

export default Discover;
