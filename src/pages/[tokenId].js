import { APP_NAME } from '@/lib/consts'
import { ShareIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { ZDK } from '@zoralabs/zdk'
import { addDays, format } from 'date-fns'

const API_ENDPOINT = 'https://api.zora.co/graphql'
const zdk = new ZDK({ endpoint: API_ENDPOINT })

const zorbArgs = {
	where: {
		collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
	},
	pagination: { limit: 500 },
	includeFullDetails: false,
}

const getFormattedDate = daysSinceGenesis => format(addDays(new Date(2022, 0, 0), daysSinceGenesis), 'yyyy-MM-dd')

const eventsArgs = tokenId => {
	const startDate = getFormattedDate(tokenId)
	const endDate = getFormattedDate(tokenId + 1)

	return {
		where: {},
		filter: { timeFilter: { endDate, startDate }, eventTypes: 'V2_AUCTION_EVENT' },
		pagination: { limit: 500 },
		includeFullDetails: false,
		includeSalesHistory: false,
		sort: { sortKey: 'CREATED', sortDirection: 'DESC' },
	}
}

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Sketch'), { ssr: false })

const Home = ({ zorbs, zoraEvents }) => (
	<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
		<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
			<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
				<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
			</div>
			<div>
				<DynamicComponentWithNoSSR zorbs={zorbs} zoraEvents={zoraEvents} />
			</div>

			<div className="flex justify-center mt-4 sm:items-center sm:justify-between">
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
	const zorbResponse = await zdk.tokens(zorbArgs)
	const dailyEventArgs = eventsArgs(params.tokenId)
	const eventsResponse = await zdk.events(dailyEventArgs)
	const zorbs = zorbResponse.tokens.nodes.map(zorb => zorb.token.image.url)
	const zoraEvents = eventsResponse.events.nodes
	return {
		props: { zorbs, zoraEvents }, // will be passed to the page component as props
	}
}

export async function getStaticPaths() {
	// const ways = posts.map(post => ({
	// 	params: { id: post.id },
	// }))

	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default Home
