import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount, useNetwork } from 'wagmi'
import { isZorbOwner } from '../../utils/zoraApi'
import TxModal from '../TxModal'

const MintButton = ({ tokenId, contract, onMint }) => {
	const [pendingTx, setPendingTx] = useState(false)
	const { activeChain, chains } = useNetwork()
	const { data: account } = useAccount()

	const handleButtonClick = async () => {
		if (!activeChain) {
			toast.error(`Please connect your wallet`)
			return setPendingTx(false)
		}
		if (activeChain?.id !== chains[0].id) {
			toast.error(`Wrong network: please connect to ${chains[0].name}`)
			return setPendingTx(false)
		}

		const isOwner = await isZorbOwner(account.address)

		setPendingTx(`Please sign transaction ${isOwner ? '(zorb holder free mint)' : '(0.04 ETH to mint)'}`)

		await contract
			.mint(tokenId, {
				value: isOwner ? 0 : parseEther('0.04').toString(),
			})
			.then(async tx => {
				setPendingTx(`minting your zorbz ${isOwner ? '(zorb holder free mint)' : ''}`)
				const receipt = await tx.wait()
				setPendingTx(false)
				toast.success('You minted your zorbz!')
				onMint()
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
