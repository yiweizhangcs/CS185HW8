import React, { Component } from 'react';
import config from './config.js';
import './NewStyle.css';
const firebase = require('firebase')

export class CreateList extends Component {
  constructor(props) {
    super();
    this.state = {
      listName: '',
    }
  }

  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  FunctionB = (event) => {
    let tempA = event.target.name;
    let value = event.target.value;
    this.setState({[tempA]: value});
  }
  
  FunctionA = (event) => {
    event.preventDefault();
    let formObj = {
      name: this.state.listName,
    };
    firebase.database().ref('lists').push().set(formObj);
    alert("You successfully created a new list!");
  }



  render() {
    return(
      <div>
        <form onSubmit={this.FunctionA}>
          <h1>Hi, You Can Creat A List!</h1>
          <h3>Instruction:Type Your New List Name Below, and then Press Submit Button.</h3>
          <input name='listName' type='text'  required onChange={this.FunctionB} style={{height: "30px",width: "200px"}}></input>
          <br/>
          <div className="submit">
            <input type='submit' name='submit' value='Submit' style={{width: "200px"}}></input>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateList;
