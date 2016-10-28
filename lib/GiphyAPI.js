'use babel';

const API_KEY = 'dc6zaTOxFJmzC';
const TAG = 'relax';
const API_URL = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${TAG}`;

//Get a random GIF from the GiphyAPI
export default function fetch_gif() {
  return fetch(API_URL, {method: 'get'})
    .then(response => {
      return response.json();
    });
}
