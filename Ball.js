const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000005; // Speed of the ball increases by [first value was 0.00001]

export default class Ball {
	constructor(ballElem) {
		this.ballElem = ballElem;
		this.reset();
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
	}

	set x(value) {
		this.ballElem.style.setProperty('--x', value);
	}

	get y() {
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
	}

	set y(value) {
		this.ballElem.style.setProperty('--y', value);
	}

	rect() {
		return this.ballElem.getBoundingClientRect();
	}

	reset() {
		this.x = 50;
		this.y = 50;
		this.direction = { x: 0 };

		while (Math.abs(this.direction.x) <= 0.2 || Math.abs.apply(this.direction.x) >= 0.9) {
			const heading = randomNumberBetween(0, 2 * Math.PI);
			this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
		}

		this.velocity = INITIAL_VELOCITY;
	}

	update(delta, paddleRects) {
		this.x += this.direction.x * this.velocity * delta;
		this.y += this.direction.y * this.velocity * delta;

		// speed ball up over time
		this.velocity += VELOCITY_INCREASE * delta;

		const rect = this.rect();

		// Ball bounces off the top and bottom of the screen
		if (rect.bottom >= window.innerHeight || rect.top <= 0) {
			this.direction.y *= -1;
		}

		// Ball bounces off the sides of the screen
		// if (rect.right >= window.innerWidth || rect.left <= 0) {
		// 	this.direction.x *= -1;
		// }

		// Checks to see if the ball hit the paddle to then move it to another direction
		if (paddleRects.some((r) => isCollision(r, rect))) {
			this.direction.x *= -1;
		}
	}
}

function randomNumberBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
	return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}
