import { parseEther } from 'ethers/lib/utils'
import { useContract, useSigner } from 'wagmi'
import abi from './abi.json'

const MintButton = ({ tokenId }) => {
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0x88d18451249d121A28637E4bE0B6BF7738729013',
		contractInterface: abi,
		signerOrProvider: signer,
	})
	console.log('CONTRACT', contract)
	console.log('TOKEN ID', tokenId)
	const handleButtonClick = async () => {
		const receipt = await contract
			.mint(tokenId, 'https://google.com', { value: parseEther('0.04').toString() })
			.then(tx => {
				console.log('TX', tx)
				return tx.wait()
			})
			.catch(err => {
				console.error(err)
				return { err }
			})
		console.log('RECEIPT', receipt)
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
