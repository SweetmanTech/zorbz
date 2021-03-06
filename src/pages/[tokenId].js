import { APP_NAME } from '@/lib/consts'
import { ShareIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { getEvents, getFormattedDate, getZorbs } from '../utils/zoraApi'
import ConnectWallet from '../components/ConnectWallet'
import Head from 'next/head'
import OwnerSection from '../components/OwnerSection'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Sketch'), { ssr: false })

const Home = ({ zorbs, zoraEvents, tokenId, time }) => (
	<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
		<Head>
			<title>zorbz #{tokenId}</title>
			<link rel="shortcut icon" href="/favicon.ico" />
			<meta
				name="description"
				content="zorbz are generated by the Zora API marketplace events. visualized with image from the zorb collection."
			/>
			<meta property="og:title" content={`zorbz #${tokenId}`} />
			<meta
				property="og:description"
				content="zorbz are generated by the Zora API marketplace events. visualized with image from the zorb collection."
			/>
			<meta
				property="og:image"
				content="https://gateway.pinata.cloud/ipfs/QmQTCVZk7nJHk6HjjiBTvXBGLivFiPwjb47aZfvxwZTVxc"
			/>
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={`zorbz #${tokenId}`} />
			<meta
				name="twitter:description"
				content="zorbz are generated by the Zora API marketplace events. visualized with image from the zorb collection."
			/>
			<meta
				name="twitter:image:src"
				content="https://gateway.pinata.cloud/ipfs/QmQTCVZk7nJHk6HjjiBTvXBGLivFiPwjb47aZfvxwZTVxc"
			/>
		</Head>
		<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
			<div className="pt-8 sm:justify-start sm:pt-0">
				<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
				<h3 className="font-bold dark:text-white">Zora Market Events for Date: {time}</h3>
				<h3 className="font-bold dark:text-white">Events: {zoraEvents.length} </h3>
				<h3 className="font-bold dark:text-white">1 zorb = 1 event</h3>
			</div>
			<ConnectWallet />
			<div>
				<DynamicComponentWithNoSSR zorbs={zorbs} zoraEvents={zoraEvents} />
			</div>

			<div className="flex justify-center mt-4 sm:items-center sm:justify-between">
				<OwnerSection tokenId={tokenId} />
				<div className="text-center text-sm text-gray-500 sm:text-left">
					<div className="flex items-center">
						<ShareIcon className="-mt-px w-5 h-5 text-gray-400" />

						<a
							target="__blank"
							href="https://github.com/SweetmanTech/zorb-visualizer"
							className="ml-1 underline"
						>
							Share
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export async function getStaticProps({ params }) {
	const { tokenId } = params
	const zorbs = await getZorbs()
	const zoraEvents = await getEvents(parseInt(tokenId))
	const time = getFormattedDate(tokenId)
	return {
		props: { zorbs, zoraEvents, tokenId, time }, // will be passed to the page component as props
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default Home
