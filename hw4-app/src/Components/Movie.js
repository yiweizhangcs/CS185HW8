import React, { Component } from 'react';
import './NewStyle.css';
const axios = require('axios');

export class Movie extends Component {
  constructor()
  {
    super();
    this.state = {
    src: '',
    title: '',
    imdb: '',
    plot: '',
    director: '',
    }
  }
  componentDidUpdate(x, y, snapshot){
    if(this.state.update!==y.update){
      this.render();
    }
    if(this.props.movie!==x.movie) {
      this.render();
    }
  }
  render() {
    return(
      <div className='showit'>
        <img src={this.props.src}
          onClick={this.props.enlarge.bind(this, this.props.src, this.props.title, this.props.director, this.props.imdb, this.props.plot, this.props.movie)} alt={this.state.title}/>
      </div>
    );
  }
}
export default Movie;
