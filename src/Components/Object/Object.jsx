import React from "react";
import "./Object.scss";
import { Vector } from "../../shared/Vector";
import { G } from "../../shared/definitions";
import { timestep } from "../../shared/definitions";

export const sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class Object extends React.Component {
	position = new Vector(this.props.x, this.props.y);
	mass = this.props.mass;
	radius = this.props.radius;
	name = this.props.name;
	color = this.props.color;

	compMaunted = false;

	componentDidMount() {
		if (!this.compMounted) {
			this.speed = this.props.speed;
			setInterval(() => {
				if (this.speed !== undefined) this.position.add(this.speed);
			}, timestep);
		}
		this.compMounted = true;
	}

	applyForce(force) {
		force.multiplyScalar(1 / this.mass); //Convert to acceleration
		this.speed.add(force);
	}

	attract(mover) {
		let distance = Math.min(
			Math.max(this.position.getDistanceFrom(mover.position), 10),
			50
		);
		let forceMag = ((mover.mass * this.mass) / Math.pow(distance, 2)) * G;
		let force = this.position.getDirectionFrom(mover.position);

		force.multiplyScalar(forceMag);
		mover.applyForce(force);
	}

	render() {
		return (
			<div className="Object">
				<div
					className="body"
					style={{
						width: this.radius,
						height: this.radius,
						backgroundColor: `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`,
						top: this.position.y - this.radius / 2,
						left: this.position.x - this.radius / 2,
					}}
				></div>
			</div>
		);
	}
}

export default Object;
