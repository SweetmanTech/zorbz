import axios from 'axios'

const pinJSONToIPFS = (req, res) => {
	console.log('REQUEST', req.body)
	return axios
		.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', req.body, {
			maxContentLength: 'Infinity',
			headers: {
				pinata_api_key: process.env.pinata_api_key,
				pinata_secret_api_key: process.env.pinata_secret_api_key,
			},
		})
		.then(response => res.status(200).json({ cid: response.data.IpfsHash }))
		.catch(error => {
			console.error(error)
			return res.status(400).json({ error })
		})
}

export default pinJSONToIPFS
