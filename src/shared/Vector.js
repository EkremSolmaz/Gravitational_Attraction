export class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	getDirectionFrom(v) {
		let x = this.x - v.x;
		let y = this.y - v.y;

		let mag = Math.sqrt(x * x + y * y);

		x /= mag;
		y /= mag;

		return new Vector(x, y);
	}

	getDistanceFrom(v) {
		let verticalDist = this.x - v.x;
		let horizontalDist = this.y - v.y;
		return Math.sqrt(
			verticalDist * verticalDist + horizontalDist * horizontalDist
		);
	}

	multiplyScalar(mag) {
		this.x *= mag;
		this.y *= mag;
	}
}
