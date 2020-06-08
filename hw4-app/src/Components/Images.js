import React, { Component } from 'react';
import './style2b.css'
import MyComponent from "./MyComponent";
import SimpleReactLightbox from "simple-react-lightbox";


export class Images extends Component {
  render() {
    	return (
    		<div>
      			<SimpleReactLightbox>
       				 <MyComponent/> 
      			</SimpleReactLightbox>
   			</div>
    		
    		);
      }
}
export default Images;




