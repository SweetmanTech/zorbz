import { parseEther } from 'ethers/lib/utils'
import { useContract, useSigner } from 'wagmi'
import { pinJSONToIPFS } from '../../utils/pinata'
import abi from './abi.json'

const MintButton = ({ tokenId }) => {
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0xCb3360dcbAf993D42d1eb008579464ce41203848',
		contractInterface: abi,
		signerOrProvider: signer,
	})
	const handleButtonClick = async () => {
		console.log('MINT BUTTON TOKEN ID', tokenId)
		const metadata = await pinJSONToIPFS(tokenId)
		console.log('METADATA', metadata)
		if (metadata.error) return

		await contract
			.mint(tokenId, `ipfs://${metadata}`, {
				value: parseEther('0.04').toString(),
			})
			.then(tx => tx.wait())
			.catch(err => {
				console.error(err)
				return { err }
			})
	}

	return (
		<button
			onClick={handleButtonClick}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			Mint
		</button>
	)
}

export default MintButton
