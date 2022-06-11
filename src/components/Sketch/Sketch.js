import React, { useEffect, useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500
const NUMBER_OF_COLUMNS = 20
const NUMBER_OF_ROWS = 25
const Sketch = ({ zorbs }) => {
	const [t, setT] = useState(0)
	const [zorb, setZorb] = useState()
	const [zorbArray, setZorbArray] = useState([])

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef)
	}

	const draw = p5 => {
		const steps = 0.005
		setT((t += steps))
		const fluid = 0.01
		const r = 24
		const w = 102
		const h = 102
		const mvx = 20
		const mvy = 20
		p5.background(0, w)
		for (let x = 0; x < NUMBER_OF_COLUMNS; x += 1)
			for (let y = 0; y < NUMBER_OF_ROWS; y += 1) {
				const n = _ => {
					return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(25 * x, 20 * y, w / 2, h / 2) * fluid))
				}
				const ox = 25 * x + mvx * p5.sin(n())
				const oy = 20 * y + mvy * p5.cos(n())

				let nz = 100
				nz = p5.noise(25 * x * fluid, 20 * y * fluid)
				if (zorb) {
					p5.image(zorbArray[(x + 1) * y], ox, oy, r, r)
				}
			}
	}

	const preload = p5 => {
		const myImages = []
		for (let i = 0; i < NUMBER_OF_COLUMNS * NUMBER_OF_ROWS; i++) {
			myImages.push(p5.loadImage(zorbs[i]))
		}
		const testZorb = p5.loadImage(zorbs[0])
		setZorb(testZorb)
		setZorbArray(myImages)
	}
	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
