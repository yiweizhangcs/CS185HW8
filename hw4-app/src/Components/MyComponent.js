import React, { Component } from 'react';
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper
import './style2b.css'

import image1 from './images/mycat2.jpg'
import image2 from './images/yasuo.jpg'
import image3 from './images/waterfall.jpg'
import image4 from './images/snow.jpg'
import image5 from './images/dog.jpeg'
import image6 from './images/HW26.jpg'
import image7 from './images/littledog.jpg'
import image8 from './images/venus.jpg'
import image9 from './images/planet.jpg'

 
function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
      	<div className="parent">
      		<div className="child">
	      		<img className="child img" src={image1} alt="picture1"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image2} alt="picture2"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image3} alt="picture3"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image4} alt="picture4"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image5} alt="picture5"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image6} alt="picture6"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image7} alt="picture7"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image8} alt="picture8"/>
	      	</div>
	      	<div className="child">
	      		<img className="child img" src={image9} alt="picture9"/>
	      	</div>
		</div>
      </SRLWrapper>
    </div>
  );
}
 
export default MyComponent;



			
	// 	</div>
	// 	<div class="child child-2">
	// 		<img src="images/yasuo.jpg">
	// 	</div>
	// 	<div class="child child-3">
	// 		<img src="images/waterfall.jpg">
	// 	</div>
	// 	<div class="child child-4">
	// 		<img src="images/snow.jpg">
	// 	</div>
	// 	<div class="child child-5">
	// 		<img src="images/dog.jpeg">
	// 	</div>
	// 	<div class="child child-1">
	// 		<img src="images/HW26.jpg">
	// 	</div>
	// 	<div class="child child-2">
	// 		<img src="images/littledog.jpg">
	// 	</div>
	// 	<div class="child child-3">
	// 		<img src="images/venus.jpg">
	// 	</div>
	// 	<div class="child child-4">
	// 		<img src="images/planet.jpg">
	// 	</div>
	// 	<div class="child child-5">
	// 		<img src="images/earth.jpg">
	// 	</div>
	// </div>