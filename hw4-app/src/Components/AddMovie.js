import React, { Component } from 'react';
import config from './config.js';
import './NewStyle.css';
const axios = require('axios');
const firebase = require('firebase')

export class AddMovie extends Component {
  constructor(props) {
    super();
    this.state = { movId: '',
    src: '',
    title: '',
    director: '',
    imdb: '',
    plot: '',
    actors: '',}
  }
  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  FunctionC(one) {
    let two = {
      name: one.state.title,
      src: one.state.src,
      director: one.state.director,
      imdb: one.state.imdb,
      plot: one.state.plot,
      actors: one.state.actors,
    };
    let ref = firebase.database().ref('movies');
    ref.once('value').then(function(snapshot) {
      let tempB = snapshot.child(one.state.movId).exists();
      if(tempB) {
        alert('The Movie is already in Data Base.');
      }
      else {
        ref.child(one.state.movId).set(two);
        alert('You Successfully Add A New Movie!');
      }
    });
  }


  FunctionB = (event) => {
    let tempA = event.target.name;
    let value = event.target.value;
    this.setState({[tempA]: value});
  }

  FunctionA = (event) => {
    event.preventDefault();
    let request = 'https://www.omdbapi.com/?apikey=aeddd447&i='+this.state.movId;
    this.FunctionD(this, request);
  }

  FunctionD(one, request) {
    axios.get(request)
    .then(function (response) {
      one.setState({
        src: response.data.Poster,
        title: response.data.Title,
        director: response.data.Director,
        imdb: response.data.imdbRating,
        plot: response.data.Plot,
        actors: response.data.Actors,
      });
    })
    .then(function () {
      one.FunctionC(one);
    })
    .catch(function (error) {
      console.log(error);
    })
  }




  render() {
    return(
      <div>
        <form onSubmit={this.FunctionA}>
          <h1>Hi, you are welcomed to add a new movie to database!</h1>
          <h2>Instructions: You need to use imdbID to add a new movie.</h2>
          <input name='movId' type='text'  required onChange={this.FunctionB} style={{height: "30px",width: "200px"}}></input>
          <br/>
          <div className="submit">
            <input type='submit' name='submit' value='Submit' style={{width: "200px"}}></input>
          </div>
        </form>
      </div>
    );
  }
}
export default AddMovie;
