const truncate = account => {
	if (!account) {
		return ''
	}

	return `${account?.slice(0, 6)}...${account?.slice(-5)}`
}

export default truncate
