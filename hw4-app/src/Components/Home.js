import React, { Component } from 'react';
import './style2b.css'

export class Home extends Component {
  render() {
    	return (
    		<div>
 				<div className="header">
					<h1>Welcome To My Website!</h1>
				</div>
				<div className="intro">
					<div className="something something-1">
						<img src={ require('./images/mycat2.jpg')}/>
					</div>
					<div className="something something-2">
						<h1>
							About Me
						</h1>
						<p>
							One of my research directions is that new technology product should be able to convenient people who need help. Last summer, I joined a non-profit project, “Wing of Love” project in Tibet. We aimed of helping local children who lost arms in misfortune. With 3D printing Technology, we could print suitable machine arms for these children. This project brings me inspiration that we should also utilize our technology to benefit disable people. Actually, some new technology like self-driving could benefit disable people more than normal people. Here, I want to say, we could utilize natural language processing on the self-driving project. Thus, a disable person could control a self-driving car with voice. I hope my ideas will come true in future.
						</p>
					</div>
				</div>
			</div>
    		);
      }
}
export default Home;