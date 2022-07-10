import { getFormattedDate } from './zoraApi'

const metadata = tokenId => {
	const startDate = getFormattedDate(tokenId)

	return {
		name: `zorbz #${tokenId}`,
		description: `zorbz\n\nfull visualization here: https://zorbz.vercel.app/${tokenId} \n\nuses data from the Zora API (events).\n\nzorbz`,
		version: '0.1',
		title: `zorbz #${tokenId} - ${startDate}`,
		artist: 'zorbz',
		mimeType: null,
		sourceCode: 'https://github.com/SweetmanTech/zorbz',
		tags: ['zorb', 'zora', 'Zora API Hackathon'],
		license: 'cc0',
		locationCreated: 'Zora API Hackathon',
		external_url: `https://zorbz.vercel.app/${tokenId}`,
		animation_url: 'ipfs://QmedC1ufEG9L1erNzrUmUwtNHAStwpbJ7FY5TEA8EcgM6k',
		project: {
			title: 'zorbz #1',
			artwork: {
				uri: `https://zorbz.vercel.app/${tokenId}`,
				mimeType: null,
				nft: null,
			},
			description: 'zorbz\n\nzorbs\n\nzorbz',
			type: 'Hackathon',
			originalReleaseDate: startDate,
		},
		artwork: {
			uri: `https://zorbz.vercel.app/${tokenId}`,
			mimeType: null,
			nft: null,
		},
		visualizer: { uri: `https://zorbz.vercel.app/${tokenId}`, mimeType: null, nft: null },
		originalReleaseDate: startDate,
		credits: [
			{ name: 'valcaholics.eth', collaboratorType: 'designer' },
			{ name: 'wayneh.eth', collaboratorType: 'engineer' },
			{ name: 'sweetman.eth', collaboratorType: 'engineer' },
		],
		attributes: {
			project: 'zorbz',
			'zora-events-date': startDate,
		},
	}
}

export default metadata
