import React, { useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500
const NUMBER_OF_COLUMNS = 20
const NUMBER_OF_ROWS = 25
const Sketch = ({ zorbs, zoraEvents = { length: 500 } }) => {
	const [t, setT] = useState(0)
	const [zorbArray, setZorbArray] = useState([])

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef)
	}

	const draw = p5 => {
		const steps = 0.005
		const mvx = 20
		const mvy = 5
		// setT((t += steps))
		// const fluid = 0.01
		// const r = 24
		// const w = 102
		// const h = 102
		// const mvx = 20
		// const mvy = 20
		// p5.background(0, w)
		// for (let x = 0; x < NUMBER_OF_COLUMNS; x += 1)
		// 	for (let y = 0; y < NUMBER_OF_ROWS; y += 1) {
		// 		const n = _ => {
		// 			return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(25 * x, 20 * y, w / 2, h / 2) * fluid))
		// 		}
		// 		const ox = 25 * x + mvx * p5.sin(n())
		// 		const oy = 20 * y + mvy * p5.cos(n())

		// 		let nz = 100
		// 		nz = p5.noise(25 * x * fluid, 20 * y * fluid)
		// 		if ((x + 1) * (y + 1) - 1 < zoraEvents.length) {
		// 			p5.image(zorbArray[(x + 1) * (y + 1) - 1], ox, oy, r, r)
		// 		}
		// 	}
		//translate(10, 25);
		setT((t += steps))
		const fluid = 0.005 //craziness [range 0.005 - 0.013]
		const r = 10 //radius size of zorbs [9-40]
		const eventVar1 = 9 // if this number goes up the "r" has to go down and vice versa
		const eventVar2 = 9
		p5.background(0)
		for (
			let x = 0;
			x < 500;
			x += eventVar1 //rows - density -> sales
		)
			for (let y = 0; y < 500; y += eventVar2) {
				//columns -> transfer

				const n = _ => {
					return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(x, y, 250, 250) * fluid))
				}
				const ox = x + mvx * p5.sin(n())
				const oy = y + mvy * p5.cos(n())

				const nz = p5.noise(x * fluid, y * fluid)
				const xMultiplier = x / eventVar1
				const yMultiplier = (y / eventVar2) % 10
				const index = xMultiplier * yMultiplier
				if (index < 500) {
					p5.image(zorbArray[xMultiplier * yMultiplier], ox, oy, r, r)
				}
			}
	}

	const preload = p5 => {
		const myImages = []
		for (let i = 0; i < NUMBER_OF_COLUMNS * NUMBER_OF_ROWS; i++) {
			myImages.push(p5.loadImage(zorbs[i]))
		}
		setZorbArray(myImages)
	}
	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
