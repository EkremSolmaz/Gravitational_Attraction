import "./App.scss";
import React, { createRef } from "react";
import Object from "./Components/Object/Object";
import { timestep } from "./shared/definitions";
import { Vector } from "./shared/Vector";

class App extends React.Component {
	compMounted = false;
	// attractorInfo = {
	// 	x: 1200,
	// 	y: 300,
	// 	mass: 1000,
	// 	radius: 50,
	// };

	objects = [];

	constructor(props) {
		super(props);

		this.objectRefs = createRef([]);
		this.objectRefs.current = [];
		this.addObject = this.addObject.bind(this);
	}

	addObject() {
		const x = Math.floor(Math.random() * 1920);
		const y = Math.floor(Math.random() * 1080);
		const mass = Math.floor(Math.random() * 990) + 10; //min: 10, max: 1000
		const radius = mass / 10; //min: 1, max: 100
		const speed = new Vector(
			Math.floor(Math.random() * 10) - 5,
			Math.floor(Math.random() * 10) - 5
		);
		const color = {
			r: Math.floor(Math.random() * 255),
			g: Math.floor(Math.random() * 255),
			b: Math.floor(Math.random() * 255),
		};
		this.objects.push({
			name: "sun 2",
			x: x,
			y: y,
			mass: mass,
			radius: radius,
			speed: speed,
			color: color,
		});
	}

	addObjectRef = (e) => {
		if (e != null && !this.objectRefs.current.includes(e)) {
			this.objectRefs.current.push(e);
		}
	};

	componentDidMount() {
		if (!this.compMounted) {
			setInterval(() => {
				for (let attractor of this.objectRefs.current) {
					for (let attractee of this.objectRefs.current) {
						if (attractor !== attractee) {
							attractor.attract(attractee);
						}
					}
				}
				let sum = { x: 0, y: 0 };
				let totalMass = 0;
				for (let object of this.objectRefs.current) {
					totalMass += object.mass;
					sum.x += object.position.x * object.mass;
					sum.y += object.position.y * object.mass;
					console.log(object.position);
				}
				let avg = { x: sum.x / totalMass, y: sum.y / totalMass };
				console.log(avg);
				let xSlide = 960 - avg.x;
				let ySlide = 540 - avg.y;

				for (let object of this.objectRefs.current) {
					object.position.x += xSlide;
					object.position.y += ySlide;
				}
			}, timestep);
		}
		this.compMounted = true;
	}

	render() {
		return (
			<div className="App">
				<button onClick={this.addObject}>ADD Object</button>
				<p>Object count: {this.objects.length}</p>
				{this.objects.map((object) => {
					return (
						<Object
							name={object.name}
							x={object.x}
							y={object.y}
							mass={object.mass}
							radius={object.radius}
							speed={object.speed}
							color={object.color}
							ref={this.addObjectRef}
						/>
					);
				})}
			</div>
		);
	}
}

export default App;
