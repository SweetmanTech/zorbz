import React, { useEffect, useState } from 'react'
import BaseSketch from 'react-p5'
import { ZDK } from '@zoralabs/zdk'

const API_ENDPOINT = 'https://api.zora.co/graphql'
const zdk = new ZDK({ endpoint: API_ENDPOINT }) // Defaults to Ethereum Mainnet

const args = {
	token: {
		address: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
		tokenId: '314',
	},
	includeFullDetails: false, // Optional, provides more data on the NFT such as all historical events
}
const windowWidth = 500
const windowHeight = 500
const Sketch = ({ zorbs }) => {
	const [t, setT] = useState(0)
	const [zorb, setZorb] = useState()

	useEffect(() => {
		console.log('PROPS: zorbs', zorbs)

		const fetchData = async () => {
			const response = await zdk.token(args)
			console.log(response)
		}
		fetchData()
	}, [])

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
		for (let x = 0; x < windowWidth; x += 25)
			for (let y = 0; y < windowHeight; y += 20) {
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
		const testZorb = p5.loadImage(zorbs[0])
		setZorb(testZorb)
	}
	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
