import React, { Component } from 'react';
// import MyFunction from "./MyFunction";
import './style2b.css';
import config from './config.js';
//get a reference to firebase
const firebase = require('firebase')

export class GuestBook extends Component {
	constructor() {
		super();
		this.state ={
			data:[],
			name: '',
			description: 'No Description',
			message: '',
			visible: '',
			email: '',
		}
	}
	componentDidMount(){
		//It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
		//You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
		//Use the second argument to useEffect() to control how often it is ran  
		if (!firebase.apps.length) {
		   firebase.initializeApp(config);
		}
		
		firebase.database().ref('data').on( 'value',  snapshot=>{
		let data=snapshot.val();
		let newData=[];
		for(let index in data){
			let dat = new Date(data[index].date);
			let date = dat.getMonth()+"/"+dat.getDate()+"/"+dat.getFullYear()+","+dat.getHours()+":"+dat.getMinutes()+":"+dat.getSeconds();
			newData.push({
				date: date,
				name: data[index].name,
				description: data[index].description,
				message: data[index].message,
				visible: data[index].visible,
				email: data[index].email,

			})
		}
		this.setState({data: newData});
		})
	}
	helper = (event) =>{
		event.preventDefault();
		if(this.state.name===''){
			alert("Hi,Name(*) is required!");
		}
		else if(this.state.message===''){
			alert("Hi,Message(*) is required!");
		}
		else{
			let infor ={
				name: this.state.name,
				description: this.state.description,
				message: this.state.message,
				visible: this.state.visible,
				email: this.state.email,
				date: firebase.database.ServerValue.TIMESTAMP,
			};
			firebase.database().ref('data').push().set(infor);
			this.setState({shouldUpdate: true});
			alert("Submit Successfully!");
		}
	}
	makeChange=(event)=>{
		let field =event.target.name;
		let value =event.target.value;
		this.setState({[field]: value});
	}

  	render() {
    	return (
    		
    			    		
	    		<div className="GuestBook">
	    			<div className='Form'>
	    				<form onSubmit={this.helper}>
	    					<h2>Message Form</h2>
	    					<h4>Hello, My Firend.Leave some message.I want to hear you!</h4>
	    					<p>
	    						<h5>
		    						<dot>*</dot>What is your Name?<br/>
		    						<input name='name' placeholder='*Name is required' type='text' minLength='6' maxLength='19' onChange={this.makeChange}
		    							style={{width:"99%", height: "20px", fontSize: 18, fontFamily: 'serif'}}/>
		    					</h5>
		    					<h5>Offer a short description of yourself.<br/>
		    						<textarea name='description' maxLength='99' onChange={this.makeChange}></textarea>
		    					</h5>
		    					<h5>
		    						<dot>*</dot> What have you to say? <br/>
		    						<textarea name='message' placeholder='*Message is required' minLength='16' maxLength='499' onChange={this.makeChange}></textarea>
		    					</h5>
		    					<h5>
		    						<dot>*</dot> Would you like your name and message to be viewable by the other guests of this site? <br/>
		    						<select id='visible' name='visible' onChange={this.makeChange}
		    						style={{height: "16px", fontSize: 16, fontFamily: 'serif'}}>
		    							<option value='public' >Yes</option>
		    							<option value='private' >No</option>	
		    						</select>
		    					</h5>
		    					<h5>
		    						Your Email(email will not be posted):<br/>
		    						<input name='email' type='text' onChange={this.makeChange}
		    							style={{width:"99%", height: "20px", fontSize: 18, fontFamily: 'serif'}}/>
		    					</h5>
		    					<p>Tips: To submit successfully, you must fullfill Name, Message, and Visible.</p>
		    					<div>
		    						<input type='submit' id='submit' name='submit' value='submit'></input>
		    					</div>
	    					</p>
	    				</form>
	    			</div>
	 				
	 				<div className='MessageBoard'>
	 					<h2>Message Board</h2>
	 					{this.state.data.map((each)=>{
	 						if(each.visible!=='private'){
	 							return(
	 								<div>
	 									<br/>
	 									<span className='date'>{each.date}</span><br/>
	 									<span className='name'>{each.name}</span><br/>
	 									<span className='description'>{each.description}</span><br/>
	 									<span className='message'>{each.message}</span><br/>
	 									<br/>
	 								</div>

	 								)
	 						}
	 					})}
	 				</div>
				</div>
    		);
      }
}
export default GuestBook;