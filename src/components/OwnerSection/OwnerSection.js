import { useEffect, useState } from 'react'
import { useContract, useEnsName, useSigner } from 'wagmi'
import MintButton from '../MintButton'
import abi from './abi.json'

const OwnerSection = ({ tokenId }) => {
	const [owner, setOwner] = useState(false)
	const { data: signer } = useSigner()
	const { data: ens } = useEnsName({
		address: owner,
		staleTime: 2_000,
	})
	console.log('owner', owner)
	console.log('ENS', ens)
	const contract = useContract({
		addressOrName: '0x9598be1c138350d70322613c3d7899c8f0b2b432',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	useEffect(() => {
		contract
			.ownerOf(tokenId)
			.then(owner => setOwner(owner))
			.catch(console.error)
	})

	return (
		<>
			{owner ? (
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<h3 className="font-bold dark:text-white">Owned by: {owner}</h3>
				</div>
			) : (
				<MintButton tokenId={tokenId} contract={contract} />
			)}
		</>
	)
}

export default OwnerSection
