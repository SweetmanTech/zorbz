import 'tailwindcss/tailwind.css'
import { APP_NAME } from '@/lib/consts'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { apiProvider, configureChains, darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const { chains, provider } = configureChains(
	[chain.rinkeby],
	[apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider coolMode chains={chains} theme={darkTheme({
				accentColor: '#7b3fe4',
				accentColorForeground: 'white',
				fontStack: 'system',
			})}>
				<ToastContainer />
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default App
