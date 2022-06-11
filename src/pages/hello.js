import React, { useEffect, useState } from 'react'
import Sketch from '../components/Sketch'

const HelloWorld = props => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (window) {
			console.log('WINDOW', window)
			setLoading(false)
		}
	}, [])

	return <>{loading ? <h1>LOADING</h1> : <Sketch />}</>
}

export default HelloWorld
