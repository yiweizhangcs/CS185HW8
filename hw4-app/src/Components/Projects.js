import React, { Component } from 'react';
import './style2b.css'

export class Projects extends Component {
  render() {
    	return (
    		<body>
				<div>
					<h1>Some Interesting Projects Topics:</h1>
				</div>
				<div class="parent-project">
					<div class="project project-1">
						<a href="https://www.elprocus.com/computer-science-projects-engineering-students/"><img src={ require('./images/project1.png')}/></a>
					</div>
					<div class="project project-2">
						<h2>Computer Science Projects Ideas for Engineering Students</h2>
						<p>
							Computer science is a branch of engineering that deals with the scientific study of computers and their usage like computation, data processing, systems control,advanced algorithmic properties, and artificial intelligence. The study of computer science includes programming, design, analysis and theory. The list of computer science project ideas is as follows.
						</p>
					</div>
					<div class="project project-3">
						<a href="https://en.wikipedia.org/wiki/Self-driving_car"><img src={ require('./images/project2.jpg')}/></a>
					</div>
					<div class="project project-4">
						<h2>Self-driving car</h2>
						<p>
							Self-driving cars combine a variety of sensors to perceive their surroundings, such as radar, lidar, sonar, GPS, odometry and inertial measurement units. Advanced control systems interpret sensory information to identify appropriate navigation paths, as well as obstacles and relevant signage.----Wikipedia
						</p>
					</div>
					<div class="project project-5">
						<a href="https://en.wikipedia.org/wiki/Object_detection"><img src={ require('./images/project3.jpg')}/></a>
					</div>
					<div class="project project-6">
						<h2>Object detection</h2>
						<p>
							Object detection is a computer technology related to computer vision and image processing that deals with detecting instances of semantic objects of a certain class (such as humans, buildings, or cars) in digital images and videos. Well-researched domains of object detection include face detection and pedestrian detection. Object detection has applications in many areas of computer vision, including image retrieval and video surveillance.
						</p>
					</div>
				</div>
			</body>
    		);
      }
}
export default Projects;