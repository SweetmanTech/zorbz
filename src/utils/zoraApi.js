import { ZDK } from '@zoralabs/zdk'
import { addDays, format } from 'date-fns'

const API_ENDPOINT = 'https://api.zora.co/graphql'
const zdk = new ZDK({ endpoint: API_ENDPOINT })

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

export const getZorbs = async () => {
	const zorbArgs = {
		where: {
			collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
		},
		pagination: { limit: 500 },
		includeFullDetails: false,
	}

	const response = await zdk.tokens(zorbArgs)
	return response.tokens.nodes.map(zorb => zorb.token.image.url)
}

export const getEvents = async daysSinceGenesis => {
	const dailyEventArgs = eventsArgs(daysSinceGenesis)

	const eventsResponse = await zdk.events(dailyEventArgs)
	return eventsResponse.events.nodes
}
