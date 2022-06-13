import { etherscanBlockExplorers, useContract, useContractRead, useSigner } from 'wagmi'
import truncate from '../../utils/truncate'
import MintButton from '../MintButton'
import abi from './abi.json'

const OwnerSection = ({ tokenId }) => {
	const { data: signer } = useSigner()
	const { data: owner, refetch } = useContractRead(
		{
			addressOrName: '0x2079c2765462Af6D78A9cCbDDb6Ff3C6D4Ba2e24',
			contractInterface: abi,
		},
		'ownerOf',
		{
			args: tokenId,
			onError(error) {
				console.error('Error', error)
			},
		}
	)
	const contract = useContract({
		addressOrName: '0x2079c2765462Af6D78A9cCbDDb6Ff3C6D4Ba2e24',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	return (
		<>
			{owner ? (
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<a
						target="__blank"
						href={`${etherscanBlockExplorers.mainnet?.url}/token/${contract.address}?a=${tokenId}`}
					>
						<h3 className="font-bold dark:text-white">Owned by: {truncate(owner)}</h3>
					</a>
				</div>
			) : (
				<MintButton tokenId={tokenId} contract={contract} onMint={refetch} />
			)}
		</>
	)
}

export default OwnerSection
