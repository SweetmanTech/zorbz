import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Sketch'), { ssr: false })

function Home() {
	return (
		<div>
			<DynamicComponentWithNoSSR />
			<p>HOME PAGE is here!</p>
		</div>
	)
}

export default Home
