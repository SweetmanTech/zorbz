import axios from 'axios'

export const pinJSONToIPFS = () =>
	axios
		.post('/api/pinata', {})
		.then(response => response.data.cid)
		.catch(error => {
			console.error(error)
			return { error }
		})
