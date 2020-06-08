import React, { useEffect, useState, Component } from 'react';
import './style2b.css';
import config from './config.js'
//get a reference to firebase
const firebase = require('firebase')



 
function MyFunction() {
	const [data, setData] = useState([])
	const [shouldRender, setShouldRender] = useState(true)
	const sample = [ "hi", "hello", "how are you" ]
	const [InputValue, setInputValue] = useState([])
	useEffect(() => {
    //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
    //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
    //Use the second argument to useEffect() to control how often it is ran  
    if (!firebase.apps.length) {
       firebase.initializeApp(config)
    } 
    //get a reference to the database
    let ref = firebase.database().ref('data')

    //retrieve its data
    ref.on('value', snapshot => {
         //this is your call back function
         //state will be a JSON object after this
         //set your apps state to contain this data however you like
         const state = snapshot.val()
         //since i use react 16, i set my state like this
         //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
         setData(state)
    })
  	},[shouldRender])
	
	const [InputValue1, setInputValue1] = useState("");
	const [InputValue2, setInputValue2] = useState("");

	const submitValue = () =>{
		const infor = {
			'input1' : InputValue1,
			'input2' : InputValue2
		};
		firebase.database().ref('data').push().set(infor);
		alert("We got your infor");
		// console.log(infor);
	}
  return (
    <div className='MyFunction'>
    	<div>
     		<input type="text" placeholder="input1" onChange={e=>setInputValue1(e.target.value)}/>
     		<input type="text" placeholder="input2" onChange={e=>setInputValue2(e.target.value)}/>
     	</div>
     	<button onClike={submitValue}>SUBMIT</button>
     	
    </div>

  //   	{sample.map((s, index) => (
  //   		<p>
  //   			{s}
  //   		</p>
  //   		))}
  //   	<div>
  //   		{data}
  //   	</div>
  //   	<div>
  //   		<div>
  //   			<p>here
  //   			</p>
  //   		</div>
  //   		<div>
  );
}
 
export default MyFunction;
