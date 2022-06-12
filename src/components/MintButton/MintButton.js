import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useContract, useSigner } from 'wagmi'
import { pinJSONToIPFS } from '../../utils/pinata'
import TxModal from '../TxModal'
import abi from './abi.json'

const MintButton = ({ tokenId }) => {
	const [pendingTx, setPendingTx] = useState(false)
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0xCb3360dcbAf993D42d1eb008579464ce41203848',
		contractInterface: abi,
		signerOrProvider: signer,
	})
	const handleButtonClick = async () => {
		setPendingTx('Please sign transaction')
		const metadata = await pinJSONToIPFS(tokenId)
		if (metadata.error) return

		await contract
			.mint(tokenId, `ipfs://${metadata}`, {
				value: parseEther('0.04').toString(),
			})
			.then(async tx => {
				setPendingTx('minting your zorbz')
				const receipt = await tx.wait()
				setPendingTx(false)
				toast.success('You minted your zorbz!')
				return receipt
			})
			.catch(err => {
				console.error(err)
				toast.error(err.reason || err.message)
				setPendingTx(false)
				return { err }
			})
	}

	return (
		<>
			<button
				onClick={handleButtonClick}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Mint
			</button>
			{pendingTx && <TxModal txBody={pendingTx} onReceipt={() => setPendingTx(false)} />}
		</>
	)
}

export default MintButton
