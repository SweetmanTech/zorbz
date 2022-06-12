import axios from 'axios'

const pinJSONToIPFS = (req, res) =>
	axios
		.post(
			'https://api.pinata.cloud/pinning/pinJSONToIPFS',
			{
				name: 'zorbz',
				description: 'zorbz\n\nzorbz\n\nzorbz',
				image: 'ipfs://QmT8utUbMh3TJ51tGi37GNw41rTtrgR6EBy6M6Bs8zRvLA',
				version: '0.1',
				title: 'zorbz',
				artist: 'zorbz',
				duration: 3.41,
				mimeType: 'audio/wav',
				losslessAudio: 'ipfs://QmPvxr8B1ujrFRDb7NPh6Kux4MiL6xQmoWuRnxftR1zodz',
				trackNumber: 1,
				genre: null,
				tags: [],
				bpm: null,
				key: null,
				license: null,
				locationCreated: null,
				external_url: 'https://www.mintsongs.com/u/0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38',
				animation_url: 'ipfs://QmPvxr8B1ujrFRDb7NPh6Kux4MiL6xQmoWuRnxftR1zodz',
				project: {
					title: 'Testing Countdown',
					artwork: {
						uri: 'ipfs://QmT8utUbMh3TJ51tGi37GNw41rTtrgR6EBy6M6Bs8zRvLA',
						mimeType: 'image/png',
						nft: null,
					},
					description: 'Testing Countdown\n\nTesting Countdown\n\nTesting Countdown',
					type: 'Single',
					originalReleaseDate: null,
					recordLabel: null,
					publisher: null,
					upc: null,
				},
				isrc: null,
				artwork: {
					uri: 'ipfs://QmT8utUbMh3TJ51tGi37GNw41rTtrgR6EBy6M6Bs8zRvLA',
					mimeType: 'image/png',
					nft: null,
				},
				lyrics: { text: null, nft: null },
				visualizer: { uri: null, mimeType: null, nft: null },
				originalReleaseDate: null,
				recordLabel: null,
				publisher: null,
				credits: [{ name: 'zorbz', collaboratorType: 'creator' }],
				attributes: {
					project: 'zorbz',
				},
			},
			{
				maxContentLength: 'Infinity',
				headers: {
					pinata_api_key: process.env.pinata_api_key,
					pinata_secret_api_key: process.env.pinata_secret_api_key,
				},
			}
		)
		.then(response => res.status(200).json({ cid: response.data.IpfsHash }))
		.catch(error => {
			console.error(error)
			return res.status(400).json({ error })
		})

export default pinJSONToIPFS
