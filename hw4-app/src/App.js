// import React, { Component, useEffect, useState } from 'react';
import React, { Component } from 'react';
import './App.css'
import Body from './Components/Body';
import TabList from './Components/TabList';
import ScrollUpButton from "react-scroll-up-button";
// //get a reference to firebase
// const firebase = require('firebase')

export class App extends Component {
  // const data
  // useEffect(() => {
  //   //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
  //   //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
  //   //Use the second argument to useEffect() to control how often it is ran
  //   if (!firebase.apps.length) {
  //      firebase.initializeApp(config)
  //   }
  //   //get a reference to the database
  //   let ref = firebase.database().ref('data')

  //   //retrieve its data
  //   ref.on('value', snapshot => {
  //        //this is your call back function
  //        //state will be a JSON object after this
  //        //set your apps state to contain this data however you like
  //        const state = snapshot.val()
  //        //since i use react 16, i set my state like this
  //        //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
  //        setData(state)
  //   })
  // })

  constructor(){
    super();
    this.state={
      activeTab: 1
    }

    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }

  render() {
    const tabs = [
    {
      id: 1,
      title: 'Home'
    },
    {
      id: 2,
      title: 'Images'
    },
    {
      id: 3,
      title: 'Videos'
    },
    {
      id: 4,
      title: 'Projects'
    },
    {
      id: 5,
      title: 'GuestBook'
    },
    {
      id: 6,
      title: 'MovieGallery'
    },
    {
      id: 7,
      title: 'AddMovie'
    },
    {
      id: 8,
      title: 'CreateList'
    },
    {
      id: 9,
      title: 'GraphViz'
    }
    ]
    return(
      <div className="body">
        <div className="nav-bar">
          <TabList tabs={tabs}
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <Body
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}/>
        </div>
        <div>
          <ScrollUpButton ShowAtPosition={110} ContainerClassName="MyOverRideClass" TransitionClassName="MyOverRideTransitionedClass"/>
        </div>
      </div>
      );
  }
}
export default App;
