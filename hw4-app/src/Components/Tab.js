import React, { Component } from 'react';

export class Tab extends Component {
	addStyling = () =>{
		if(this.props.tab.id == this.props.activeTab){
			return {border: '2px solid black',
					color: 'orange'}
		}
		else{
			return {border: '2px solid white',
					}
		}
	}
 	render() {
    	return(
    			<div className='tab'
    			style={this.addStyling()}
    			onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
    				<h2>{this.props.tab.title}</h2>
    			</div>
    		);
      }
}
export default Tab;