import React from "react";
import "./Mover.scss";
import { Vector } from "../../shared/Vector";
import { timestep } from "../../shared/definitions";

class Mover extends React.Component {
	position = new Vector(this.props.x, this.props.y);
	mass = this.props.mass;

	compMaunted = false;

	componentDidMount() {
		if (!this.compMounted) {
			this.speed = new Vector(0, 0);
			setInterval(() => {
				if (this.speed !== undefined) this.position.add(this.speed);
				this.position.x = Math.min(Math.max(this.position.x, 0), 1920);
				this.position.y = Math.min(Math.max(this.position.y, 0), 1080);
			}, timestep);
		}
		this.compMounted = true;
	}

	applyForce(force) {
		force.multiplyScalar(1 / this.mass); //Convert to acceleration
		this.speed.add(force);
	}

	render() {
		return (
			<div className="Mover">
				<p>Mover.X: {this.position.x}</p>
				<p>Mover.Y: {this.position.y}</p>
				<div
					className="body"
					style={{
						top: this.position.y - 25,
						left: this.position.x - 25,
					}}
				></div>
			</div>
		);
	}
}

export default Mover;
