import React, { Component } from "react";
import API from '../utils/API';
import SearchForm from '../components/SearchForm'

class Search extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: ""
  };

  componentDidMount() {
    this.searchDogs("african");
  }

  searchDogs = query => {
    API.search(query)
      .then(res => {
        this.setState({ results: res.data.message })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchDogs(this.state.search);
  };

  render() {
    console.log(this.state.results)
    return (
      <div>
        <h1>Search By Breed</h1>
        
        <SearchForm 
          handleInputChange={this.handleInputChange}
          value={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
        />

        {
          this.state.results.map(result => {
            return (
              <div className="card">
                <img src={result} alt="" />
              </div>
            )
          })
        }
        

      </div>
    );
  }
  
}

export default Search;
