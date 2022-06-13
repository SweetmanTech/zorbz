import { etherscanBlockExplorers, useContract, useContractRead, useSigner } from 'wagmi'
import truncate from '../../utils/truncate'
import MintButton from '../MintButton'
import abi from './abi.json'

const OwnerSection = ({ tokenId }) => {
	const { data: signer } = useSigner()
	const { data: owner } = useContractRead(
		{
			addressOrName: '0x9598be1c138350d70322613c3d7899c8f0b2b432',
			contractInterface: abi,
		},
		'ownerOf',
		{
			args: tokenId,
		}
	)

	const contract = useContract({
		addressOrName: '0x9598be1c138350d70322613c3d7899c8f0b2b432',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	return (
		<>
			{owner ? (
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<a
						target="__blank"
						href={`${etherscanBlockExplorers.rinkeby?.url}/token/${contract.address}?a=${tokenId}`}
					>
						<h3 className="font-bold dark:text-white">Owned by: {truncate(owner)}</h3>
					</a>
				</div>
			) : (
				<MintButton tokenId={tokenId} contract={contract} />
			)}
		</>
	)
}

export default OwnerSection
