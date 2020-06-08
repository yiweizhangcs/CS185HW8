import React, { Component } from 'react';
import './style2b.css'

export class Videos extends Component {
  render() {
    	return (
    		<body>
				<div>
					<h1>Videos</h1>
				</div>
				<div class="parent-video">
					<div class="video video-1">
						<iframe width="340" height="190" src="https://www.youtube.com/embed/5dsGWM5XGdg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>

					<div class="video video-2">
						<iframe width="340" height="190" src="https://www.youtube.com/embed/kjba6GI5inw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>

					<div class="video video-3">
						<iframe width="340" height="190" src="https://www.youtube.com/embed/2DuAIwwLwD4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
					<div class="video video-4">
						<iframe width="340" height="190" src="https://www.youtube.com/embed/Un5SEJ8MyPc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
					<div class="video video-5">
						<iframe width="340" height="190" src="https://www.youtube.com/embed/-yMS-z--1zE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</div> 
			</body>
    		);
      }
}
export default Videos;