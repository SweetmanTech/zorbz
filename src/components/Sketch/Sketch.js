import React, { useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500
const NUMBER_OF_COLUMNS = 20 // 500?
const NUMBER_OF_ROWS = 25 // 500?
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
		setT((t += steps))
		const fluid = 0.009
		const r = 25
		const w = 99
		const mvx = 20
		const mvy = 5
		let eventVar1 = 1
		let eventVar2 = 1

		p5.background(0, w)
		for (let x = 0; x < NUMBER_OF_COLUMNS; x += eventVar1)
			for (let y = 0; y < NUMBER_OF_ROWS; y += eventVar2) {
				const n = _ => {
					return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(x, y, 250,250) * fluid))
				}
				const ox = x + mvx * p5.sin(n())
				const oy = y + mvy * p5.cos(n())

				let nz = 100
				nz = p5.noise(x * fluid, y * fluid);
				if ((x + 1) * (y + 1) - 1 < zoraEvents.length) {
					p5.image(zorbArray[(x + 1) * (y + 1) - 1], ox, oy, r, r)
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
