import axios from "axios";
const randomURL = "https://dog.ceo/api/breeds/image/random";
const allBreedsURL = ' https://dog.ceo/api/breed'

export default {
  getRandomDogPic: function() {
    return axios.get(randomURL);
  },
  search: function(query) {
    return axios.get(`${allBreedsURL}/${query}/images`);
  }
};
