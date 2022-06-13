import React, { useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500
const Sketch = ({ zorbs, zoraEvents = { length: 500 } }) => {
	const [t, setT] = useState(0)
	const [zorbArray, setZorbArray] = useState([])

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef)
	}

	const draw = p5 => {
		const steps = 0.002 //speed
		setT((t += steps))
		const fluid = 0.009
		const zorbRadius = 24 //size of balls
		const w = 500
		const h = 500
		const mvx = 50
		const mvy = 10
		p5.background(0, w)
		const NUMBER_OF_ROWS = Math.floor(Math.sqrt((5 * zoraEvents.length) / 4))
		const NUMBER_OF_COLUMNS = Math.ceil(zoraEvents.length / NUMBER_OF_ROWS) // 20

		for (let x = 0; x < NUMBER_OF_COLUMNS; x += 1)
			for (let y = 0; y < NUMBER_OF_ROWS; y += 1) {
				const n = _ => {
					return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(25 * x, 20 * y, w / 2, h / 2) * fluid))
				}
				const xCoordinate = (windowWidth / NUMBER_OF_COLUMNS) * x + mvx * p5.sin(n())
				const yCoordinate = (windowHeight / NUMBER_OF_ROWS) * y + mvy * p5.cos(n())

				let nz = 100
				nz = p5.noise(15 * x * fluid, 20 * y * fluid)
				const zorbIndex = (x + 1) * (y + 1) - 1
				if (zorbIndex < zoraEvents.length) {
					p5.image(zorbArray[zorbIndex], xCoordinate, yCoordinate, zorbRadius, zorbRadius)
				}
			}
	}

	const preload = p5 => {
		const myImages = []

		for (let i = 0; i < zorbs.length; i++) {
			myImages.push(p5.loadImage(zorbs[i]))
		}
		setZorbArray(myImages)
	}
	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
