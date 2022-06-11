import React, { useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500
let x = 50
let y = 50
const Sketch = props => {
	const [t, setT] = useState(0)
	const [zorb, setZorb] = useState()

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)

		const canvas = p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef)
		const slider = p5.createSlider(1, 10, 5)
		//slider.position(0, h+2);
		slider.style('width', '80px')
		const slider2 = p5.createSlider(1, 16, 8)
		//slider2.position(0, h+20);
		slider2.style('width', '80px')
	}

	const draw = p5 => {
		// p5.background(0)
		// p5.ellipse(x, y, 70, 70)
		// // NOTE: Do not use setState in the draw function or in functions that are executed
		// // in the draw function...
		// // please use normal variables or class properties for these purposes
		// x++
		const steps = 0.005
		setT((t += steps))
		const fluid = 0.01 //slider.value()*fx/5;
		const r = 24 //slider2.value();
		const w = 102
		const h = 102
		const mvx = 20
		const mvy = 20
		p5.background(0, w)
		for (x = 0; x < windowWidth; x += 25)
			for (y = 0; y < windowHeight; y += 20) {
				const n = _ => {
					return p5.TAU * (t + p5.sin(p5.TAU * t - p5.dist(x, y, w / 2, h / 2) * fluid))
				}
				const ox = x + mvx * p5.sin(n())
				const oy = y + mvy * p5.cos(n())

				let nz = 100
				nz = p5.noise(x * fluid, y * fluid)
				if (zorb) {
					p5.image(zorb, ox, oy, r, r)
				}
			}
	}

	const preload = p5 => {
		const testZorb = p5.loadImage(
			'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9Imd6ciIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg2Ni40NTc4IDI0LjM1NzUpIHNjYWxlKDc1LjI5MDgpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcj0iMSIgY3g9IjAiIGN5PSIwJSI+PHN0b3Agb2Zmc2V0PSIxNS42MiUiIHN0b3AtY29sb3I9ImhzbCgzMjYsIDczJSwgOTQlKSIgLz48c3RvcCBvZmZzZXQ9IjM5LjU4JSIgc3RvcC1jb2xvcj0iaHNsKDMyNSwgNzklLCA4NyUpIiAvPjxzdG9wIG9mZnNldD0iNzIuOTIlIiBzdG9wLWNvbG9yPSJoc2woMzE5LCA4OCUsIDc0JSkiIC8+PHN0b3Agb2Zmc2V0PSI5MC42MyUiIHN0b3AtY29sb3I9ImhzbCgzMTcsIDkyJSwgNjQlKSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9ImhzbCgzMTYsIDkyJSwgNjMlKSIgLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LDUpIj48cGF0aCBkPSJNMTAwIDUwQzEwMCAyMi4zODU4IDc3LjYxNDIgMCA1MCAwQzIyLjM4NTggMCAwIDIyLjM4NTggMCA1MEMwIDc3LjYxNDIgMjIuMzg1OCAxMDAgNTAgMTAwQzc3LjYxNDIgMTAwIDEwMCA3Ny42MTQyIDEwMCA1MFoiIGZpbGw9InVybCgjZ3pyKSIgLz48cGF0aCBzdHJva2U9InJnYmEoMCwwLDAsMC4wNzUpIiBmaWxsPSJ0cmFuc3BhcmVudCIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNNTAsMC41YzI3LjMsMCw0OS41LDIyLjIsNDkuNSw0OS41Uzc3LjMsOTkuNSw1MCw5OS41UzAuNSw3Ny4zLDAuNSw1MFMyMi43LDAuNSw1MCwwLjV6IiAvPjwvZz48L3N2Zz4='
		)
		setZorb(testZorb)
	}
	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
