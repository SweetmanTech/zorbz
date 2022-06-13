import metadata from '../../../utils/metadata'

const tokenUri = (req, res) => res.status(200).json(metadata(req.query.id))

export default tokenUri
