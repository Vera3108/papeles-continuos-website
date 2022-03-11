export class Point {
	constructor(x, y, size = 0.0025) {
		this.x = x
		this.y = y
		this.size = size
	}
}

export class Line {
	constructor(color) {
		this.points = []
		this.color = color
	}

	addPoint(point) {
		this.points.push([ point.x, point.y, point.size ])
	}

	draw(p) {
		for (let i = 0; i < this.points.length - 1; i++) {
			let start = this.points[i]
			let end = this.points[i + 1]
			let size = this.points[i + 1][2]

			p.strokeJoin(p.ROUND)
			p.strokeWeight(size * p.width)
			p.stroke(this.color)

			if (i == 0) p.circle(start[0] * p.width, start[1] * p.height, size * p.width * 0.1)
			p.line(start[0] * p.width, start[1] * p.height, end[0] * p.width, end[1] * p.height)
		}
	}
}
