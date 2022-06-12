import axios from 'axios'
import metadata from './metadata'

export const pinJSONToIPFS = tokenId =>
	axios
		.post('/api/pinata', metadata(tokenId))
		.then(response => response.data.cid)
		.catch(error => {
			console.error(error)
			return { error }
		})
