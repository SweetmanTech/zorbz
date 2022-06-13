import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useContract, useSigner } from 'wagmi'
import TxModal from '../TxModal'
import abi from './abi.json'

const MintButton = ({ tokenId }) => {
	const [pendingTx, setPendingTx] = useState(false)
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0x9598BE1c138350d70322613C3d7899c8F0b2B432',
		contractInterface: abi,
		signerOrProvider: signer,
	})
	const handleButtonClick = async () => {
		setPendingTx('Please sign transaction')

		await contract
			.mint(tokenId, {
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
