import { etherscanBlockExplorers, useContract, useContractRead, useSigner } from 'wagmi'
import truncate from '../../utils/truncate'
import MintButton from '../MintButton'
import abi from './abi.json'

const OwnerSection = ({ tokenId }) => {
	const { data: signer } = useSigner()
	const { data: owner, refetch } = useContractRead(
		{
			addressOrName: '0x9598be1c138350d70322613c3d7899c8f0b2b432',
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
	const zorbsRead = useContractRead(
		{
			addressOrName: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
			contractInterface: abi,
		},
		'balanceOf',
		{
			args: '0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38',
			onSuccess(data) {
				console.log('Success', data)
			},
			onError(err) {
				console.log('ERROR', err)
			},
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
				<MintButton tokenId={tokenId} contract={contract} onMint={refetch} />
			)}
		</>
	)
}

export default OwnerSection
